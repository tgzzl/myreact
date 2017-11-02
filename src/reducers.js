const initialState = {
  data: '',
  selectedTab: 'redTab'
}

const globalState = (state = initialState, action) => {
  return {...state, ...action.data}
}

export default globalState
