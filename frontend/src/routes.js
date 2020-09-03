import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PhonebookScreen from "./screens/PhonebookScreen";


const Baserouter = () => (
  <div>
    <Switch>
      <Route exact={true} path="/" component={HomeScreen} title="Index Page" />
      <Route path="/phonebook" component={PhonebookScreen} />
    </Switch>
  </div>
);

export default Baserouter;
