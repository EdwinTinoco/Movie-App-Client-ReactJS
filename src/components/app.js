import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Icons from "../helper/icons";

import NavigationBar from "./navigation-bar/navigation-bar"
import Home from "./pages/home"
import MovieDetails from "./movies/movie-detail"

export default function App(props) {
  Icons();

  return (
    <div className="container">
      <Router>
        <div>

          <NavigationBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movie/:slug" component={MovieDetails} />
          </Switch>

        </div>
      </Router>
    </div>
  );
}
