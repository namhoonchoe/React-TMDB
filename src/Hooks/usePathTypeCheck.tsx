import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

export const usePathTypeCheck = () => {
  const path = useLocation().pathname
  const [pathType, setPathType] = useState<string>("")

  useEffect(() => {
    const checkDetailType = () => {
      if(path.includes("movie")) {
        setPathType("movie")
      }
      
      if(path.includes("series")) {
        setPathType("series")
      }
      
      if(path.includes("person")) {
        setPathType("person")
      }

      if(path.includes("search")) {
        setPathType("search")
      }

      if(path.includes("bookmark")) {
        setPathType("bookmark")
      }
    } 
    checkDetailType()
  },[pathType,path])

  return pathType 
}