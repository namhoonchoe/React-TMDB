import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "@redux/searchSlice"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Flex } from "@chakra-ui/react"
import Detail from "@screens/Detail";
import Header from "./Layout/Header";
import Home from "@screens/Home";
import Movie from "@screens/Movie";
import Person from "@screens/Person";
import TV from "@screens/TV";
import Search from "@screens/Search";
import Discover from "@screens/Discover";
import BookMark from "@screens/BookMark";
import Profile from "@screens/Profile";

const RootRouter:React.FC = () => {
  const redirection = useSelector(selectSearch).redirection
  return (
    <Router>
      <Flex direction="column" align="center">
      <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/search" component={Search}/>
          <Route path="/discover/movie" component={Discover}/>
          <Route path="/discover/series" component={Discover}/>
          <Route path="/movie/:id" component={Detail}/>
          <Route path="/series/:id" component={Detail}/>
          <Route path="/movie" component={Movie}/>
          <Route path="/series" component={TV}/>
          <Route path="/person" component={Person}/>
          <Route path="/profile/:id" component={Profile}/>
          <Route path="/bookmark" component={BookMark}/>
        </Switch>
        <Route path="/*">
          {redirection !=="" && <Redirect to="/search"/>}
        </Route>
      </Flex>
    </Router>
  );
};

export default RootRouter