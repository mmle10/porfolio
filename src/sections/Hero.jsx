import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";
import ParallaxPlanets from "../components/ParallaxPlanets";
import SceneLighting from "../components/3d/lighting/SceneLighting";
import SceneControls from "../components/3d/controls/SceneControls";
import SceneEffects from "../components/3d/effects/SceneEffects";
import * as THREE from "three";
import { Austronant2 } from "../components/Austronant-2";

const Hero = ({ currentBackground }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  const renderBackground = () => {
    switch (currentBackground) {
      case "mountains":
        return (
          <>
            <ParallaxBackground />
            <figure className="absolute inset-0 h-screen w-screen">
              <Canvas camera={{ position: [0, 1, 3] }}>
                <Suspense fallback={<Loader />}>
                  <Float>
                    <Astronaut
                      scale={isMobile ? 0.23 : 0.3}
                      position={isMobile ? [0, -1.5, 0] : [0, -1, 0]}
                    />
                  </Float>
                  <Rig />
                </Suspense>
              </Canvas>
            </figure>
          </>
        );
      case "planets":
        return (
          <>
            <ParallaxPlanets />
            <figure className="absolute inset-0 h-full w-full">
              {/* Left scrollable overlay */}
              <div
                className="absolute top-0 left-0  "
                style={{ width: "18vw", height: "100vh", zIndex: 50, pointerEvents: "auto" }}
              />
              {/* Right scrollable overlay */}
              <div
                className="absolute top-0 right-0 "
                style={{ width: "18vw",height: "100vh", zIndex: 50, pointerEvents: "auto" }}
              />
              <div
                className="absolute top-0 left-0 w-screen "
                style={{ height: "18vh", zIndex: 50, pointerEvents: "auto" }}
              />
              {/* Bottom scrollable overlay */}
              <div
                className="absolute bottom-0 left-0 w-screen "
                style={{ height: "18vh", zIndex: 50, pointerEvents: "auto" }}
              />
              <Canvas
                className="cursor-grab"
                gl={{
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 0.08,
                  outputColorSpace: THREE.SRGBColorSpace,
                  outputEncoding: THREE.sRGBEncoding,
                }}
                camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={<Loader />}>
                  <SceneLighting />
                  <SceneControls />
                  <SceneEffects />
                  <Float
                    speed={4.5}
                    rotationIntensity={0.3}
                    floatIntensity={1}
                    rotation={[0, Math.PI / 100, 0]}
                    scale={isMobile ? 1 : 1.25}
                    position={isMobile ? [0, -3, 0] : [-0.5, -3, 0]}>
                    <Austronant2 />
                  </Float>
                  {/* <group
                      scale={isMobile ? 0.001 : 0.006}
                      // position={isMobile ? [1.2, -1.2, 0] : [1.2, 0, 0]}
                      rotation={[1, 4 / 4, 3]}>
                      <Austronant3 />
                    </group> */}
                  {/* <Rig /> */}
                </Suspense>
              </Canvas>
            </figure>
          </>
        );
      default:
        return <ParallaxPlanets />;
    }
  };

  return (
    <section
      id="home"
      className="flex items-start relative justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      {renderBackground()}
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
