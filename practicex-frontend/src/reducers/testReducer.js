export default function testReducer(state = {
  all: [],
  selected: {},
}, action) {
  switch (action.type) {
    case 'ADD_TESTS':
      return Object.assign({}, state, { all: action.payload });
    case 'SELECT_TEST':
      return Object.assign({}, state, { selected: action.payload });
    case 'FETCHING_TESTS':
      return state;
    default:
      return state;
  }
}
