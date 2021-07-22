import React, { useReducer,useEffect } from 'react'
import { useLocation } from "react-router-dom";
import MovieDetail from "./DetialTypes/MovieDetail"
import SeriesDetail from "./DetialTypes/SeriesDetail"
import PersonDetail from "./DetialTypes/PersonDetail"

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
  const detailPath:string =  useLocation().pathname
  const [detail,dispatch] = useReducer(detailReucer,initialState)
  
  const checkDetail = () => {
    if (detailPath.includes("movie")){
      dispatch({type:"checkMovie"})
    } else if(detailPath.includes("tv")){
      dispatch({type:"checkSeries"})
    } else if(detailPath.includes("person")){
      dispatch({type:"checkPerson"})
    } 
  }

  useEffect(() => {
    checkDetail()
    return () => {
      checkDetail()
    }  
  })


  const { movie, series, person } = detail
  return (
    <>
      { movie ?  <MovieDetail /> : null }
      { series ? <SeriesDetail/> : null }
      { person ? <PersonDetail/> : null }
    </>
  )
}

