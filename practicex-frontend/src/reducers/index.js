import { combineReducers } from 'redux';
import testReducer from './testReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  tests: testReducer,
});

export default rootReducer;
