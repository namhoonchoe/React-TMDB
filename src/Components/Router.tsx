import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Detail from "../Screens/Detail";
import Header from "./Header";
import Home from "../Screens/Home";
import Movie from "../Screens/Movie";
import Person from "../Screens/Person"
import TV from "../Screens/TV";
import Search from "../Screens/Search";

const RoootRouter: React.FC = () => {
  return (
    <Router>
      <>
      <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tv" component={TV} />
          <Route path="/search" component={Search} />
          <Route path="/tag" component={Search} />
          <Route path="/person" component={Person} />
          <Route path="/movie/:id" component={Detail} />
          <Route path="/tv/:id" component={Detail} />
          <Route path="/person/:id" component={Detail} />
          <Route path="/movie/" component={Movie} />
        </Switch>
      </>
    </Router>
  );
};

export default RoootRouter;
