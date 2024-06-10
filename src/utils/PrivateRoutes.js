import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkTokenExpiration() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
