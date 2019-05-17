const JWT = require('jsonwebtoken');

export const loadUser = () => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    try {
      return {
        token: token,
        id: JWT.verify(token, process.env.REACT_APP_SECRET_KEY).id,
        email: JWT.verify(token, process.env.REACT_APP_SECRET_KEY).email,
        username: JWT.verify(token, process.env.REACT_APP_SECRET_KEY).username,
        authenticated: true,
      };
    } catch (error) {
      console.error(error);
    }
  } else {
    return {};
  }
}

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    try {
      JWT.verify(token, process.env.REACT_APP_SECRET_KEY);
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}
