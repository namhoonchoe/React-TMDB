import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

export const usePathTypeCheck = () => {
  const path = useLocation().pathname
  const [pathType, setPathType] = useState<string>("")

  const checkDetailType = () => {
    if(path.includes("movie")) {
      setPathType("movie")
    } else if(path.includes("tv")) {
      setPathType("series")
    } else if(path.includes("person")) {
      setPathType("person")
    }
  } 
  useEffect(() => {
    checkDetailType() 
      return () => {
        checkDetailType()
      }  
  },[pathType])

  return pathType 
}