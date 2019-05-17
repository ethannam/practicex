import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { loadUser } from './auth';

const configureStore = () => {
  const initialState = { user: loadUser() };
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );

  return store;
}

export default configureStore;