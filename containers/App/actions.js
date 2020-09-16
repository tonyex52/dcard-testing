export const actionTypes = {
  loadRepositories: 'App/loadRepositories',
  loadRepositoriesSuccess: 'App/loadRepositoriesSuccess',
  loadNextPageRepositories: 'App/loadNextPageRepositories',
}

export const loadRepositories = (payload) => ({
  type: actionTypes.loadRepositories,
  payload,
})

export const loadRepositoriesSuccess = (payload) => ({
  type: actionTypes.loadRepositoriesSuccess,
  payload,
})

export const loadNextPageRepositories = () => ({
  type: actionTypes.loadNextPageRepositories,
})
