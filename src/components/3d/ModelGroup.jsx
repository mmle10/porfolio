import React from 'react'
import ModelParts from './ModelParts'

export default function ModelGroup({ nodes, materials }) {
  return (
    <group name="skeletal3_6">
      <ModelParts nodes={nodes} materials={materials} />
    </group>
  )
} 