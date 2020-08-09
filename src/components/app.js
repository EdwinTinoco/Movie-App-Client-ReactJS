import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'

import Icons from "../helper/icons";

import NavigationBar from "./navigation-bar/navigation-bar"
import Home from "./pages/home"
import SignUp from "./auth/signup"
import Auth from "./pages/auth"
import Admin from "./pages/admin"
import MovieDetails from "./movies/movie-detail"
import NoMatch from "./pages/no-match";

export default function App(props) {
  const [userCookie, setUserCookie] = useState("")

  Icons();

  const getUserCookie = () => {
    if (Cookies.get("_sb%_user%_session") !== undefined) {
      console.log('user logged in');

      setUserCookie(
        Cookies.get("_sb%_user%_session")
      )
    } else {
      console.log('user not logged');
    }
  }

  useEffect(() => {
    getUserCookie()
  }, [])

  return (
    <div className="container">
      <Router>
        <div>

          <NavigationBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedSignUp path="/signup" user={userCookie} component={SignUp} />
            <ProtectedAuth path="/auth" user={userCookie} component={Auth} />
            <ProtectedAdmin path="/admin" user={userCookie} component={Admin} />
            <Route exact path="/movie/:slug" component={MovieDetails} />
            <Route component={NoMatch} />
          </Switch>

        </div>
      </Router>
    </div>
  );
}

const ProtectedAuth = ({ user, component: Component, ...rest }) => {
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

const ProtectedAdmin = ({ user, component: Component, ...rest }) => {
  const [userAuth, setUserAuth] = useState(0)
  let currentUser = Cookies.get("_sb%_user%_session")


  let userCookie = Cookies.get("_sb%_user%_session")
  let temp = 0
  let userIdArr = []

  if (userCookie !== undefined) {
    for (var i = 0; i < userCookie.length; i++) {
      if (userCookie[i] == "%") {
        temp += 1
      }

      if (temp === 2) {
        if (userCookie[i] !== "%") {
          userIdArr.push(userCookie[i])
        }
      }
    }

    let userId = userIdArr.join('')

    axios.get(`http://localhost:8000/api/users/${userId}/`)
      .then(response => {
        console.log('response navbar user', response.data);

        if (response.data.length > 0) {
          setUserAuth(
            response.data[0].users_authorization_id
          )
        }

      }).catch(error => {
        setError(
          "An error ocurred"
        )
      });
  }


  return (
    <Route
      {...rest}
      render={props => currentUser !== "" && currentUser !== undefined && userAuth === 1 ?
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