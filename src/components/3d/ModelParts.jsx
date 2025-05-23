import React from 'react'
import ModelPart from './ModelPart'

export default function ModelParts({ nodes, materials }) {
  // Check if we have the required nodes and materials
  if (!nodes || !materials) {
    return null
  }

  // Check if specific nodes exist
  const hasRequiredNodes = ['Object_99', 'Object_100', 'Object_103', 'Object_106'].every(
    nodeName => nodes[nodeName]?.geometry && nodes[nodeName]?.skeleton
  )

  if (!hasRequiredNodes) {
    console.warn('Missing required nodes for Austronant2 model')
    return null
  }

  return (
    <>
      <ModelPart 
        name="Object_99"
        geometry={nodes.Object_99.geometry}
        material={materials.material_0}
        skeleton={nodes.Object_99.skeleton}
      />
      <ModelPart 
        name="Object_100"
        geometry={nodes.Object_100.geometry}
        material={materials.material_0}
        skeleton={nodes.Object_100.skeleton}
      />
      <ModelPart 
        name="Object_103"
        geometry={nodes.Object_103.geometry}
        material={materials.material_1}
        skeleton={nodes.Object_103.skeleton}
      />
      <ModelPart 
        name="Object_106"
        geometry={nodes.Object_106.geometry}
        material={materials.material_2}
        skeleton={nodes.Object_106.skeleton}
      />
    </>
  )
} 