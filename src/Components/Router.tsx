import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//import Detail from "../Screens/Detail";
import Home from "../Screens/Home";
import Movie from "../Screens/Movie";
import TV from "../Screens/TV";
import Header from "./Header";
import Search from "../Screens/Search";

const RoootRouter: React.FC = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tv" component={TV} />
          <Route path="/search" component={Search} />
          <Route path="/movie/" component={Movie} />
        </Switch>
      </>
    </Router>
  );
};

export default RoootRouter;
