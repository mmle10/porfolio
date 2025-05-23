import { useEffect } from 'react'
import * as THREE from 'three'
const useModelMaterials = (materials) => {
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material) {
        material.needsUpdate = true
        material.roughness = 0.3
        material.metalness = 0.8
        material.envMapIntensity = 1.5
        material.toneMapped = true
        material.transparent = true
        material.opacity = 1
        material.side = 2 // Render both sides
        material.depthWrite = true
        material.depthTest = true
        material.emissive = new THREE.Color(0x000000)
        material.emissiveIntensity = 0.2
      }
    })
  }, [materials])
}

export default useModelMaterials; 