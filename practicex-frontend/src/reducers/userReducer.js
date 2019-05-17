export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_USER':
      return action.payload
    case 'REMOVE_USER':
      return {};
    case 'CREATING_ACCOUNT':
      return state;
    case 'LOGGING_IN_USER':
      return state;
    default:
      return state;
  }
}
