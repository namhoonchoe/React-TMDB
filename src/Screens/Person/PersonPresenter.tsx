import React from "react";
import Section from "../../Components/Section"
import { Flex } from "@chakra-ui/react"
import LoadingSpinner from "../../Components/LoadingSpinner"

interface IPersonProps {
  popular:null|PersonData,
  error:boolean,
  loading:boolean
}

const PersonPresenter:React.FC<IPersonProps> = ({popular,error,loading}) => {
  return (
  <>
  <Flex direction="column" justify="center" ml={5} width="100vw" mb={5}>
    { loading 
    ?<LoadingSpinner/> 
    : null }

    { error ? <p>"An error has occured"</p>: null }

    { popular !== null && popular.length > 0 
    ? <Section 
      title={"Popular"}
      sectionInfos={popular}
      />
    :null
    }
	</Flex>
  </>
  )
};

export default PersonPresenter;
