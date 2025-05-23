// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { BlendFunction } from 'postprocessing';
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";

export function Austronant3(props) {
  const { nodes, materials } = useGLTF('/models/austronant-3.glb')

  // const screensRef = useRef();

  return (
    <group {...props} dispose={null}>
        {/* <EffectComposer>
        <SelectiveBloom
          selection={screensRef}
          intensity={1.5} // Strength of the bloom
          luminanceThreshold={0.2} // Minimum luminance needed
          luminanceSmoothing={0.9} // Smooth transition
          blendFunction={BlendFunction.ADD} // How it blends
        />
      </EffectComposer> */}
      <mesh geometry={nodes.Object_2001.geometry} material={materials['material_0.001']} position={[0,0,0]} rotation={[0,0,0]} scale={1} />
      <mesh geometry={nodes.Object_3001.geometry} material={materials['material_0.001']} position={[0,0,0]} rotation={[0,0,0]} scale={1} />
    </group>
  )
}

useGLTF.preload('/models/austronant-3.glb')
