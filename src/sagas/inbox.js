import { delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../constant'
import DB from '../../DB'
const db = new DB()

export function* fetchInbox({ payload, type }) {
  try {
    console.log('Fetchbox..... type: ', type)
    const {} = yield select()
    const data = yield db.fetchMessages({ page: payload.page })
    console.log('Data fetch: ', data.records.length)
    yield put({ type: actionTypes.INBOX.RESPONSE, payload: data })
  } catch (error) {}
}

export function* watchInbox() {
  yield takeLatest(
    [actionTypes.INBOX.REFRESH, actionTypes.INBOX.REQUEST],
    fetchInbox,
  )
  // yield takeLatest(, fetchInbox)
}
