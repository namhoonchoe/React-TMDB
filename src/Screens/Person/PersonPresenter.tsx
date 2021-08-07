import React from "react";
import Section from "@components/Section"
import { VStack, Box } from "@chakra-ui/react"
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
    ?<LoadingSpinner/> 
    : <VStack spacing="8" width="100%" >
        <Box>
          { popular !== null && popular.length > 0 
          ? <Section 
              title={"Popular"}
              sectionInfos={popular}
            />
          :null } 
        </Box>
      </VStack> }

    { error ? <p>An error has occured</p>: null }
  </>
  )
};

export default PersonPresenter;
