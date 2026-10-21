import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BackSide,
  CapsuleGeometry,
  Color,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Quaternion,
  Vector3,
} from "three";

const THEME = {
  deep: "#1f1e39",
  base: "#6a3fd6",
  hot: "#ea4884",
  spark: "#33c2cc",
  rim: "#33c2cc",
};

const ORB_COLORS = ["#ea4884", "#33c2cc", "#ca2f8c", "#57db96"];

const ORBITS = [
  { axis: [0.2, 1, 0.15], speed: 0.22, phase: 2.85, dir: 1, radius: 1.9 },
  { axis: [1, 0.25, -0.4], speed: 0.16, phase: 0.92, dir: -1, radius: 2.0 },
  { axis: [-0.35, 0.5, 1], speed: 0.13, phase: 1.43, dir: 1, radius: 1.85 },
  { axis: [0.7, -0.6, 0.5], speed: 0.26, phase: 1.85, dir: -1, radius: 1.95 },
];

const LIGHT = new Vector3(-1, 0.8, 0.25).normalize().multiplyScalar(5);

const spikeVertexShader = `
attribute vec3 a_instancePos;
attribute vec4 a_instanceQuat;
attribute float a_instanceRand;
uniform float u_scale;
uniform float u_breath;
uniform float u_push;
uniform float u_falloff;
uniform vec3 u_orbs[4];
varying vec3 v_worldPos;
varying vec3 v_instancePos;
varying vec3 v_worldNormal;
varying vec3 v_modelPos;
varying float v_energy;
varying float v_rand;

vec3 gRotateByQuat(vec3 v, vec4 q) {
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

float gOrbFalloff(vec3 p, vec3 orb) {
  float d = length(p - orb);
  return 1.0 - clamp(1.0 / (u_falloff * d * d), 0.0, 1.0);
}

void main() {
  vec3 basePos = a_instancePos * u_breath;
  float dent = 1.0;
  for (int i = 0; i < 4; i++) {
    dent = min(dent, gOrbFalloff(basePos, u_orbs[i]));
  }

  vec3 pos = position;
  vec3 norm = normal;
  if (1.0 - step(-2.5, pos.y) > 0.5) {
    pos.y = -2.5;
    norm = vec3(0.0, -1.0, 0.0);
  }

  pos = gRotateByQuat(pos, a_instanceQuat);
  pos *= u_scale;
  pos += basePos;
  pos += normalize(basePos) * (u_push * pow(dent, 0.7));
  norm = gRotateByQuat(norm, a_instanceQuat);

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
  v_worldPos = worldPosition.xyz;
  v_instancePos = basePos;
  v_modelPos = position;
  v_rand = a_instanceRand;
  v_energy = 1.0 - dent;
  v_worldNormal = normalize(mat3(modelMatrix) * norm);
}
`;

const spikeFragmentShader = `
varying vec3 v_worldPos;
varying vec3 v_instancePos;
varying vec3 v_worldNormal;
varying vec3 v_modelPos;
varying float v_energy;
varying float v_rand;
uniform vec3 u_lightPosition;
uniform vec3 u_colorDeep;
uniform vec3 u_colorBase;
uniform vec3 u_colorHot;
uniform vec3 u_colorSpark;
uniform vec3 u_colorRim;
uniform float u_glow;

float gLinearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {
  vec3 N = normalize(normalize(v_instancePos) + 0.2 * normalize(v_worldNormal));
  vec3 V = normalize(cameraPosition - v_worldPos);
  vec3 L = normalize(u_lightPosition - v_instancePos);
  float NdL = max(0.0, dot(N, L));
  float ao = gLinearStep(-0.5, -3.0, v_modelPos.y);
  float shadow = 0.05 + 0.95 * smoothstep(-0.2, 0.55, NdL);
  vec3 cool = mix(u_colorDeep, u_colorBase, smoothstep(-0.2, 1.0, NdL));
  vec3 hot = mix(u_colorHot, u_colorSpark, v_rand * 0.45);
  vec3 color = mix(cool, hot, smoothstep(0.16, 0.8, v_energy));
  color *= ao * ao;
  color *= shadow;
  float rim = pow(1.0 - max(0.0, dot(N, V)), 2.8);
  color += mix(u_colorBase, u_colorRim, 0.4) * rim * (0.45 + NdL * 0.4) * ao;
  vec3 H = normalize(V + L);
  color += vec3(1.0) * pow(max(0.0, dot(N, H)), 22.0) * 0.16 * ao;
  color += hot * smoothstep(0.42, 0.92, v_energy) * ao * u_glow;
  gl_FragColor = vec4(color, 1.0);
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0 / 2.2));
}
`;

const orbVertexShader = `
varying vec3 v_worldPos;
varying vec3 v_worldNormal;
void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  v_worldPos = worldPosition.xyz;
  v_worldNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const orbFragmentShader = `
varying vec3 v_worldPos;
varying vec3 v_worldNormal;
uniform vec3 u_color;
uniform vec3 u_lightPosition;
uniform float u_intensity;
void main() {
  vec3 N = normalize(v_worldNormal);
  vec3 V = normalize(cameraPosition - v_worldPos);
  vec3 L = normalize(u_lightPosition - v_worldPos);
  vec3 H = normalize(V + L);
  float NdV = max(0.0, dot(N, V));
  float NdL = max(0.0, dot(N, L));
  float fresnel = pow(1.0 - NdV, 3.0);
  float spec = pow(max(0.0, dot(H, N)), 220.0);
  vec3 color = u_color * (0.35 + 0.65 * NdL);
  color += u_color * pow(NdV, 1.6) * 1.4;
  color += mix(u_color, vec3(1.0), 0.65) * fresnel * 1.8;
  color += vec3(1.0) * spec * 0.9;
  color *= u_intensity;
  gl_FragColor = vec4(color, 1.0);
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0 / 2.2));
}
`;

const coreVertexShader = `
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vModelPos;
void main() {
  vModelPos = position;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const coreFragmentShader = `
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vModelPos;
uniform vec3 u_lightPosition;
uniform vec3 u_colorDeep;
uniform vec3 u_colorBase;
uniform vec3 u_colorHot;
uniform vec3 u_colorRim;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPos);
  vec3 L = normalize(u_lightPosition);
  float NdL = max(0.0, dot(N, L));
  float wrap = NdL * 0.9 + 0.06;
  float fres = pow(1.0 - max(0.0, dot(N, V)), 2.5);
  float lat = vModelPos.y;
  float bands = 0.5 + 0.5 * sin(lat * 11.0 + sin(lat * 5.4) * 0.85);
  bands = smoothstep(0.22, 0.82, bands);
  float poles = smoothstep(0.52, 1.08, abs(lat));
  vec3 albedo = mix(u_colorDeep, u_colorBase, wrap);
  albedo = mix(albedo, u_colorHot, bands * wrap * 0.4);
  albedo = mix(albedo, u_colorDeep, poles * 0.5);
  vec3 color = albedo * wrap;
  color += mix(u_colorBase, u_colorRim, 0.5) * fres * (0.38 + NdL * 0.75);
  color += u_colorHot * pow(NdL, 9.0) * 0.24;
  gl_FragColor = vec4(color, 1.0);
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0 / 2.2));
}
`;

const atmosVertexShader = `
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
void main() {
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const atmosFragmentShader = `
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
uniform vec3 u_lightPosition;
uniform vec3 u_colorRim;
void main() {
  vec3 N = normalize(-vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPos);
  vec3 L = normalize(u_lightPosition);
  float fres = pow(1.0 - abs(dot(N, V)), 2.8);
  float ndl = max(0.0, dot(normalize(vWorldNormal), L));
  float alpha = clamp(fres * (0.18 + ndl * 0.5), 0.0, 0.55);
  vec3 color = mix(u_colorRim, vec3(1.0), 0.22);
  gl_FragColor = vec4(color, alpha);
}
`;

const toVec3 = (hex) => {
  const color = new Color(hex);
  return new Vector3(color.r, color.g, color.b);
};

const planeBasis = (axis) => {
  const normal = new Vector3(...axis).normalize();
  const reference = Math.abs(normal.y) > 0.9 ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0);
  const u = new Vector3().crossVectors(normal, reference).normalize();
  const v = new Vector3().crossVectors(normal, u).normalize();
  return { u, v };
};

const createSpikeGeometry = (count, radius) => {
  const reference = new CapsuleGeometry(1, 4, 4, 12);
  const geometry = new InstancedBufferGeometry();
  for (const id in reference.attributes) {
    geometry.setAttribute(id, reference.attributes[id]);
  }
  geometry.setIndex(reference.index);
  geometry.instanceCount = count;

  const positions = new Float32Array(count * 3);
  const quaternions = new Float32Array(count * 4);
  const randoms = new Float32Array(count);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const up = new Vector3(0, 1, 0);
  const direction = new Vector3();
  const quaternion = new Quaternion();

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * ring * radius;
    const z = Math.sin(theta) * ring * radius;
    const posY = y * radius;
    positions[i * 3] = x;
    positions[i * 3 + 1] = posY;
    positions[i * 3 + 2] = z;
    direction.set(-x, -posY, -z).normalize();
    quaternion.setFromUnitVectors(up, direction);
    quaternions[i * 4] = quaternion.x;
    quaternions[i * 4 + 1] = quaternion.y;
    quaternions[i * 4 + 2] = quaternion.z;
    quaternions[i * 4 + 3] = quaternion.w;
    randoms[i] = (((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1;
  }

  geometry.setAttribute("a_instancePos", new InstancedBufferAttribute(positions, 3));
  geometry.setAttribute("a_instanceQuat", new InstancedBufferAttribute(quaternions, 4));
  geometry.setAttribute("a_instanceRand", new InstancedBufferAttribute(randoms, 1));
  reference.dispose();
  return geometry;
};

const SpikeGlobe = ({ count }) => {
  const group = useRef(null);
  const material = useRef(null);
  const orbRefs = useRef([]);
  const bases = useMemo(() => ORBITS.map((orbit) => planeBasis(orbit.axis)), []);
  const geometry = useMemo(() => createSpikeGeometry(count, 1.5), [count]);

  const spikeUniforms = useMemo(
    () => ({
      u_scale: { value: 0.094 },
      u_breath: { value: 1 },
      u_push: { value: 0.42 },
      u_falloff: { value: 8 },
      u_orbs: { value: [new Vector3(), new Vector3(), new Vector3(), new Vector3()] },
      u_lightPosition: { value: LIGHT.clone() },
      u_colorDeep: { value: toVec3(THEME.deep) },
      u_colorBase: { value: toVec3(THEME.base) },
      u_colorHot: { value: toVec3(THEME.hot) },
      u_colorSpark: { value: toVec3(THEME.spark) },
      u_colorRim: { value: toVec3(THEME.rim) },
      u_glow: { value: 1.35 },
    }),
    []
  );

  const orbUniforms = useMemo(
    () =>
      ORB_COLORS.map((hex) => ({
        u_color: { value: toVec3(hex) },
        u_lightPosition: { value: LIGHT.clone() },
        u_intensity: { value: 0.5 },
      })),
    []
  );

  const coreUniforms = useMemo(
    () => ({
      u_lightPosition: { value: LIGHT.clone() },
      u_colorDeep: { value: toVec3(THEME.deep) },
      u_colorBase: { value: toVec3(THEME.base) },
      u_colorHot: { value: toVec3(THEME.hot) },
      u_colorRim: { value: toVec3(THEME.rim) },
    }),
    []
  );

  const atmosUniforms = useMemo(
    () => ({
      u_lightPosition: { value: LIGHT.clone() },
      u_colorRim: { value: toVec3(THEME.rim) },
    }),
    []
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (group.current && !reduced) {
      group.current.rotation.y += delta * 0.024;
      group.current.rotation.x = -0.36;
    }

    const uniforms = material.current?.uniforms;
    if (!uniforms) return;
    uniforms.u_breath.value = 1 + Math.sin(time * 0.6) * 0.02;
    const orbPositions = uniforms.u_orbs.value;
    ORBITS.forEach((orbit, index) => {
      const { u, v } = bases[index];
      const angle = orbit.dir * orbit.speed * time + orbit.phase;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      orbPositions[index]
        .set(u.x * cos + v.x * sin, u.y * cos + v.y * sin, u.z * cos + v.z * sin)
        .multiplyScalar(orbit.radius);
      orbRefs.current[index]?.position.copy(orbPositions[index]);
    });
  });

  return (
    <group ref={group} scale={0.78}>
      <mesh>
        <sphereGeometry args={[1.38, 64, 64]} />
        <shaderMaterial
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={coreUniforms}
        />
      </mesh>
      <mesh geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          vertexShader={spikeVertexShader}
          fragmentShader={spikeFragmentShader}
          uniforms={spikeUniforms}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.68, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosVertexShader}
          fragmentShader={atmosFragmentShader}
          uniforms={atmosUniforms}
          transparent
          depthWrite={false}
          side={BackSide}
        />
      </mesh>
      {ORB_COLORS.map((hex, index) => (
        <mesh
          key={hex}
          ref={(node) => {
            orbRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.11, 24, 24]} />
          <shaderMaterial
            vertexShader={orbVertexShader}
            fragmentShader={orbFragmentShader}
            uniforms={orbUniforms[index]}
          />
        </mesh>
      ))}
    </group>
  );
};

const HeroPlanet = () => {
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 1100 : 2200;

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 6.2], fov: 32 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <SpikeGlobe count={count} />
    </Canvas>
  );
};

export default HeroPlanet;
