import {
  all,
  call,
  put,
  takeLatest,
  select,
  fork,
  take,
} from 'redux-saga/effects'
import fetchApi from 'utils/fetchApi'
import { PER_PAGE } from 'constants/common'
import { actionTypes, loadRepositoriesSuccess } from './actions'

export function* loadRepositoriesFlow({ payload: searchWord, page = 1 }) {
  try {
    const response = yield call(fetchApi, {
      method: 'get',
      url: 'https://api.github.com/search/repositories',
      params: {
        q: searchWord,
        per_page: PER_PAGE,
        page,
      },
    })
    yield put(loadRepositoriesSuccess(response))

    const list = yield select((state) => state.app.repositories)
    if (list.length < response.total_count) {
      yield take(actionTypes.loadNextPageRepositories)
      yield fork(loadRepositoriesFlow, { payload: searchWord, page: page + 1 })
    }
  } catch (errorCode) {
    yield call(console.log, errorCode)
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actionTypes.loadRepositories, loadRepositoriesFlow)])
}
