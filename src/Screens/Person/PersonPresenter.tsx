import React from "react";
import Section from "@components/Section"
import { Box } from "@chakra-ui/react"
import LoadingSpinner from "@components/LoadingSpinner"

interface IPersonProps {
  popular:null|PersonData,
  error:boolean,
  loading:boolean
}

const PersonPresenter:React.FC<IPersonProps> = ({popular,error,loading}) => {
  return (
  <>
    { loading 
    ? <LoadingSpinner/> 
    :  <Box width="100%"> 
      { popular !== null && popular.length > 0 
      ? <Section 
          title={"Popular"}
          sectionInfos={popular}
        />
      :null } 
      </Box> }

    { error ? <p>An error has occured</p>: null }
  </>
  )
};

export default PersonPresenter;
