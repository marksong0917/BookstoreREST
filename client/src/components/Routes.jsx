import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home";

import Register from "./users/Register";
import Login from "./sessions/Login";
import Logout from "./sessions/Logout";

import Books from "./books/Index";
import NewBook from "./books/New";
import EditBook from "./books/Edit";



function Routes({ user, setUser }) {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(renderProps) => <Home {...renderProps} user={user} />}
      />
      <Route
        exact
        path="/register"
        render={(renderProps) => (
          <Register {...renderProps} setUser={setUser} />
        )}
      />
      <Route
        exact
        path="/login"
        render={(renderProps) => <Login {...renderProps} setUser={setUser} />}
      />
      <Route
        exact
        path="/logout"
        render={(renderProps) => <Logout {...renderProps} setUser={setUser} />}
      />
      <Route
        exact
        path="/books"
        render={(props) =>
          user ? <Books {...props} user={user} /> : <Redirect to="/" />
        }
      />
      <Route
        exact
        path="/books/new"
        render={(props) =>
          user ? <NewBook {...props} /> : <Redirect to="/" />
        }
      />
      <Route
        exact
        path="/books/edit"
        render={(props) =>
          user ? <EditBook {...props} /> : <Redirect to="/" />
        }
      />
    </Switch>
  );
}

export default Routes;
