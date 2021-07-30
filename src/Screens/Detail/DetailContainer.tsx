import React, { useReducer,useEffect } from 'react'
import { usePathTypeCheck } from '@hooks/usePathTypeCheck'
import MovieDetail from "./DetailTypes/MovieDetail"
import SeriesDetail from "./DetailTypes/SeriesDetail"
import PersonDetail from "./DetailTypes/PersonDetail"

interface IDetailTypes {
  movie:boolean,
  series:boolean,
  person:boolean
}

type Actions = 
    {type:"checkMovie"} 
  | {type:"checkSeries"} 
  | {type:"checkPerson" }

const initialState:IDetailTypes = {
  movie:false,
  series:false,
  person:false
}

const detailReucer = (state:IDetailTypes,action:Actions) => {
  switch(action.type) {
    case"checkMovie":
      return {...state ,movie:true }
    case"checkSeries":
      return {...state, series:true }   
    case"checkPerson":
      return {...state ,person:true}   
  }
}

export default function DetailContainer() {
	const pathType = usePathTypeCheck()
  const [detail,dispatch] = useReducer(detailReucer,initialState)
  
  useEffect(() => {
    const checkDetail = () => {
      if (pathType === "movie") {
        dispatch({type:"checkMovie"})
      } 
  
      if(pathType === "series") {
        dispatch({type:"checkSeries"})
      } 
  
      if(pathType === "person") {
        dispatch({type:"checkPerson"})
      } 
    }
    checkDetail()
  },[pathType])




  const { movie, series, person } = detail
  return (
    <>
      { movie && <MovieDetail/>}
      { series && <SeriesDetail/>}
      { person && <PersonDetail/>}
    </>
  )
}

