import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuthenticated, loading }) => (
      <Route
        {...rest}
        render={props =>
          !isAuthenticated && !loading ? (
            <Redirect to="/login" />
          ) : (
            <Component {...props} />
          )
        }
      />
    )}
  </AuthContext.Consumer>
);

export default PrivateRoute;