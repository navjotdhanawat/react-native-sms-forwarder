import { select, takeEvery } from 'redux-saga/effects'
import { actionTypes } from '../constant'

export function* fetchInbox() {
  try {
    const {} = yield select()
  } catch (error) {}
}

export function* watchInbox() {
  yield takeEvery(actionTypes.INBOX.REQUEST, fetchInbox)
}
