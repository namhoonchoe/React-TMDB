import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";


const HeaderBox = styled.header`
  display:grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap:12rem;
`
const List = styled.ul`
  margin:2.5px 5px;
  display:flex;
  justify-content:flex-start

`

interface Path {
  current:boolean
}


const StyledNav = styled.li`
  width:100vw;
  font-size:15px;
  margin: 0 5px;
  border-bottom: 3px solid
  ${(props:Path) => (props.current ? "#3498db" : "transparent")};  

`

const StyledLink = styled(Link)`


`



const Header = () => {
  const path =  useLocation().pathname

  return (
    <HeaderBox>
      <List>
        <StyledNav current = {path ===  "/movie"} >          
          <StyledLink to="/movie">Movies</StyledLink>
        </StyledNav>
        <StyledNav current = {path ===  "/tv"}>          
          <StyledLink to="/tv">TV</StyledLink>
        </StyledNav>
        <StyledNav current = {path === "/person"}>          
          <StyledLink to="/person">Person</StyledLink>
        </StyledNav>
      </List>
      <List>
        <StyledNav current = {path === "/search"}>          
          <StyledLink to="/search">Search</StyledLink>
        </StyledNav>
      </List>
    </HeaderBox>
  )
};

export default Header