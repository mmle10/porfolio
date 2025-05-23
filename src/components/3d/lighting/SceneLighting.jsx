import React from 'react'
import { SpotLight } from '@react-three/drei'

export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <SpotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        
      />
      <pointLight position={[-10, -10, -10]} intensity={0.2} />
    </>
  )
} 