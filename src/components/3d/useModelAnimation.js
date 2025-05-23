import { useEffect } from 'react'

const useModelAnimation = (animations, actions) => {
  useEffect(() => {
    if (animations.length > 0) {
      const action = actions[animations[0].name]
      if (action) {
        action.play()
      }
    }
  }, [actions, animations])
}

export default useModelAnimation; 