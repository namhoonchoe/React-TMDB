import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "@redux/searchSlice";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Detail from "@screens/Detail";
import Header from "./Display/Header";
import Home from "@screens/Home";
import Movie from "@screens/Movie";
import Person from "@screens/Person";
import TV from "@screens/TV";
import Search from "@screens/Search";
import Discover from "@screens/Discover";
import BookMark from "@screens/BookMark";
import Profile from "@screens/Profile";

const RootRouter: React.FC = () => {
  const redirection = useSelector(selectSearch).redirection;
  return (
    <Router>
      <Flex flexDirection="column" alignItems="center">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="discover/movie" element={<Discover />} />
          <Route path="discover/series" element={<Discover />} />
          <Route path="movie/:id" element={<Detail />} />
          <Route path="series/:id" element={<Detail />} />
          <Route path="movie" element={<Movie />} />
          <Route path="series" element={<TV />} />
          <Route path="person" element={<Person />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="bookmark" element={<BookMark />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </Flex>
      {redirection !== "" && <Navigate to="search"/>}
    </Router>
  );
};

export default RootRouter;
