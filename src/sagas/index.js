import { all, fork } from 'redux-saga/effects'
import { watchInbox } from './inbox'

export function* rootSaga() {
  yield all([fork(watchInbox)])
}
