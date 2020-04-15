import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Services/AuthContent";

export default function PrivateRoute({ component: Component, roles, ...rest }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated)
          return (
            <Redirect
              to={{ pathname: "/SignIn", state: { from: props.location } }}
            />
          );

        if (!roles.included(user.roles))
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        return <Component {...props} />;
      }}
    />
  );
}
