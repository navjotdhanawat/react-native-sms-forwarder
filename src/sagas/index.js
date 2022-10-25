import { all } from 'redux-saga/effects'
import { watchInbox } from './inbox'

export function* rootSaga() {
  yield all([watchInbox])
}
