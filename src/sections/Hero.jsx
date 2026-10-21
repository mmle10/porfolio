import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import HeroCinematic, { HeroOrbit } from "../components/HeroCinematic";
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
              <Canvas
                className="cursor-grab"
                gl={{
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 0.08,
                  outputColorSpace: THREE.SRGBColorSpace,
                  outputEncoding: THREE.sRGBEncoding,
                }}
                camera={{ position: [0, 0, 5], fov: 75 }}
              >
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
                    position={isMobile ? [0, -3, 0] : [-0.5, -3, 0]}
                  >
                    <Austronant2 />
                  </Float>
                </Suspense>
              </Canvas>
            </figure>
          </>
        );
      default:
        return <HeroCinematic />;
    }
  };

  const isCinematic =
    currentBackground !== "mountains" && currentBackground !== "planets";

  return (
    <section
      id="home"
      className="hero-stage relative flex flex-col items-stretch justify-end min-h-screen overflow-hidden"
    >
      {renderBackground()}
      {isCinematic && (
        <div className="absolute right-0 top-[9%] z-10 w-full max-w-none pointer-events-none md:top-[8%] md:right-6 md:left-auto md:w-[50%] lg:right-14">
          <div className="flex items-center justify-center w-full">
            <div id="orbit-home" className="hero-orbit-scene" aria-hidden="true" />
          </div>
          <HeroOrbit />
        </div>
      )}
      <HeroText />
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
