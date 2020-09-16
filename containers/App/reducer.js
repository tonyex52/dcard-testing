import { actionTypes } from './actions'

const initialState = {
  isLoaded: false,
  repositories: [],
  total: 0,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.loadRepositories:
      return initialState
    case actionTypes.loadRepositoriesSuccess:
      return {
        ...state,
        isLoaded: true,
        repositories: state.repositories.concat(payload.items),
        total: payload.total_count,
      }
    case actionTypes.loadNextPageRepositories:
      return {
        ...state,
        isLoaded: false,
      }
    default:
      return state
  }
}

export default reducer
