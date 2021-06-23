import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import { Flex, Spacer,Text,Box } from "@chakra-ui/react"


interface Path {
  current:boolean
}


const StyledNav = styled.li`
  list-style:none;
  font-size:15px;
  margin: 0 5px;
  border-bottom: 3px solid
  ${(props:Path) => (props.current ? "#3498db" : "transparent")};  
`

const StyledLink = styled(Link)`
`

const Header:React.FC = () => {
  const path =  useLocation().pathname

  return (
    <>
      <Box display="flex" alignItems="center" mx={5} mt={2.5} >
        <Flex justify="flex-start" align="center">
          <StyledNav current = {path ===  "/"} >          
            <StyledLink to="/">
              <Text fontSize="lg" decoration="none">Home</Text>
            </StyledLink>
          </StyledNav>
          <StyledNav current = {path ===  "/movie"}>          
            <StyledLink to="/movie">
              <Text fontSize="lg">Movies</Text>
            </StyledLink>
          </StyledNav>
          <StyledNav current = {path ===  "/tv"} >          
            <StyledLink to="/tv">
              <Text fontSize="lg">TV</Text>
            </StyledLink>
          </StyledNav>
          <StyledNav current = {path ===  "/person"} >          
            <StyledLink to="/person">
              <Text fontSize="lg">Person</Text>
            </StyledLink>
          </StyledNav>
        </Flex>
        <Spacer/>
        <Box> 
          <StyledNav current = {path ===  "/search"} >          
            <StyledLink to="/search">
              <SearchBox/>
            </StyledLink>
          </StyledNav>        
        </Box>
      </Box>
    </>
  )
};

export default Header