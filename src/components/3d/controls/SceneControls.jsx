import React from 'react'
import { OrbitControls } from '@react-three/drei'

export default function SceneControls() {
  return (
    <OrbitControls 
    enablePan={true} // Prevents panning of the scene
    enableZoom={true} // Disables zoom on tablets
    maxDistance={50} // Maximum distance for zooming out
    minDistance={1} // Minimum distance for zooming in
    minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
    maxPolarAngle={Math.PI / 3} // Maximum angle for vertical rotation
    enableRotate={true}

    />
  )
} 