export const fetchTests = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_TESTS' });

    fetch(process.env.REACT_APP_TESTS_PATH, {
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch({ type: 'ADD_TESTS', payload: json.tests });
      });
  }
}

export const fetchTest = (name) => {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_TESTS' });

    fetch(`${process.env.REACT_APP_TESTS_PATH}/${name}`, {
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => response.json())
      .then(json => dispatch({ type: 'SELECT_TEST', payload: json.test }));
  }
}