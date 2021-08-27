import React, {useState, useEffect} from 'react'
import PersonPresenter from "./PersonPresenter";
import { personApi } from "@api";

interface IPersonData {
  popular:null
}

const PersonContainer:React.FC = () => {
  const [person,setPerson] = useState<IPersonData>({
    popular:null
  })
  const [error,setError] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true;
    const getPersonData = async() => {
      try { 
      const {
        data: { results: popular },
        } = await personApi.popular();
        setPerson({...person,popular})
      } catch {   
        setError(true)
      } finally {
        setLoading(false)
      }
    } 
    if(mounted) {
      getPersonData()
    }
    return () => {
      mounted = false
    }},[person])
    const { popular }  = person
  return (
    <PersonPresenter 
      popular={popular}
      error={error}
      loading={loading}
    />
  )
}


export default PersonContainer