const JWT = require('jsonwebtoken');
const Goby = require('goby').init();

export const addUser = (token) => {
  localStorage.setItem('token', token);

  try {
    return {
      type: 'ADD_USER',
      payload: {
        token: token,
        id: JWT.verify(token, process.env.REACT_APP_SECRET_KEY).id,
        email: JWT.verify(token, process.env.REACT_APP_SECRET_KEY).email,
        username: JWT.verify(token, process.env.REACT_APP_SECRET_KEY).username,
        authenticated: true,
      },
    };
  } catch (error) {
    return { type: 'ADD_USER', payload: {} };
  }
}

export const createAccount = (params) => {
  return (dispatch) => {
    dispatch({ type: 'CREATING_ACCOUNT' });
    
    params.username = Goby.generate(['adj', 'suf']).replace(' ', '-').toLowerCase();
    fetch(process.env.REACT_APP_USERS_PATH, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({ user: params })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
      .then(json => {
        localStorage.setItem('token', json.jwt);
        dispatch({ 
          type: 'ADD_USER', 
          payload: {
            id: JWT.verify(json.jwt, process.env.REACT_APP_SECRET_KEY).id,
            email: JWT.verify(json.jwt, process.env.REACT_APP_SECRET_KEY).email,
            username: JWT.verify(json.jwt, process.env.REACT_APP_SECRET_KEY).username,
            authenticated: true,
          },
        })
      })
      .catch(error => console.error(error));
  };
}

export const login = (params) => {
  return (dispatch) => {
    dispatch({ type: 'LOGGING_IN_USER' });

    fetch(process.env.REACT_APP_LOGIN_PATH, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({ user: params })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
      .then(json => {
        localStorage.setItem('token', json.jwt);
        dispatch({ 
          type: 'ADD_USER', 
          payload: {
            id: JWT.verify(json.jwt, process.env.REACT_APP_SECRET_KEY).id,
            email: JWT.verify(json.jwt, process.env.REACT_APP_SECRET_KEY).email,
            username: JWT.verify(json.jwt, process.env.REACT_APP_SECRET_KEY).username,
            authenticated: true,
          },
        })
      })
      .catch(error => console.error(error));
  };
}

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: 'REMOVE_USER'
  };
}
