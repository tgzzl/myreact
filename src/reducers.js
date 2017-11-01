const initialState = {
  data: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return Object.assign({}, ...state, {
        data: action.data
      });
    default:
      return {...state};
  }
}

export default {
  authReducer
}
