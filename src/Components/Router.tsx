import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Detail from "@screens/Detail";
import Header from "./Header";
import Home from "@screens/Home";
import Movie from "@screens/Movie";
import Person from "@screens/Person"
import TV from "@screens/TV";
import Search from "@screens/Search";
import { useSelector } from "react-redux";
import { selectSearch } from "@redux/searchSlice"

const RoootRouter: React.FC = () => {
  const searchTerm = useSelector(selectSearch)

  return (
    <Router>
      <>
      <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search}/>
          <Route path="/tag" component={Search} />
          <Route path="/movie/:id" component={Detail} />
          <Route path="/tv/:id" component={Detail} />
          <Route path="/person/:id" component={Detail} />
          <Route path="/movie" component={Movie} />
          <Route path="/tv" component={TV} />
          <Route path="/person" component={Person} />
        </Switch>
        <Route path="/*">
          {searchTerm !=="" && <Redirect to="/search"/>}
        </Route>
      </>
    </Router>
  );
};

export default RoootRouter;
