import { useState, useEffect } from 'react'
import { useColorMode } from '@chakra-ui/color-mode'

export const useIconColor = () => {
  const colorMode = useColorMode().colorMode
  const [defaultColor, setDefaultColor] = useState<string>("")

  useEffect(() => {
    let mounted = true
    const colorChecker = () => {
      if(colorMode === 'dark') {
        setDefaultColor("#F7FAFC")
      } else {
        setDefaultColor("#4A5568")
      }
    } 
    
    if(mounted) {
      colorChecker()
    }

    return () => {
      mounted = false
    }

  },[colorMode])

  return defaultColor 
}