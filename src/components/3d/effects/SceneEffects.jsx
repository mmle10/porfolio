import { Environment } from '@react-three/drei'

export default function SceneEffects() {
  return (
    <>
      <Environment preset="studio" />
      <fog attach="fog" args={['#202020', 0, 20]} />
    </>
  )
} 