import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";

export default (
  <Switch>
    <Routes exact path="/" component={Landing} />
    <Routes path="/register" component={Register} />
    <Routes path="/dash" component={Dashboard} />
    <Routes path="/profile" component={Profile} />
  </Switch>
);
