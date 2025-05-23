import React from 'react'

const ModelPart = ({ geometry, material, skeleton, name }) => (
  <skinnedMesh 
    name={name}
    geometry={geometry}
    material={material}
    skeleton={skeleton}
    castShadow
    receiveShadow
    frustumCulled={false}
  />
);

export default ModelPart; 