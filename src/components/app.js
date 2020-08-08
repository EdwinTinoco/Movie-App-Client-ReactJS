import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Cookies from 'js-cookie'

import Icons from "../helper/icons";

import NavigationBar from "./navigation-bar/navigation-bar"
import Home from "./pages/home"
import SignUp from "./auth/signup"
import Auth from "./pages/auth"
import MovieDetails from "./movies/movie-detail"

export default function App(props) {
  const [userCookie, setUserCookie] = useState("")

  Icons();

  const getUserCookie = () => {
    if (Cookies.get("_sb%_user%_session") !== undefined) {
      console.log('usuario logeado');

      setUserCookie(
        Cookies.get("_sb%_user%_session")
      )
    } else {
      console.log('usuario no logeado');
    }

    console.log("userCookie", Cookies.get("_sb%_user%_session"))
  }

  // useEffect(() => {
  //   getUserCookie()
  // }, [])

  return (
    <div className="container">
      <Router>
        <div>

          <NavigationBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedSignUp path="/signup" user={userCookie} component={SignUp} />
            <ProtectedAuth path="/auth" user={userCookie} component={Auth} />
            <Route exact path="/movie/:slug" component={MovieDetails} />
          </Switch>

        </div>
      </Router>
    </div>
  );
}

const ProtectedAuth = ({ user, component: Component, ...rest }) => {
  console.log("from protected auth", user)
  return (
    <Route
      {...rest}
      render={props => user === "" ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}

const ProtectedSignUp = ({ user, component: Component, ...rest }) => {
  console.log("from protected signup", user)
  return (
    <Route
      {...rest}
      render={props => user === "" ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}
