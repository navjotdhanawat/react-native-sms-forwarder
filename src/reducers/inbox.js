import { actionTypes } from '../constant'

const initialState = { records: [], isFetching: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INBOX.REQUEST:
      return { ...state, isRehydrate: false, isFetching: true }

    case actionTypes.INBOX.RESPONSE:
      return {
        pages: action.payload.pages,
        currentPage: action.payload.currentPage,
        isFetching: false,
        records: [...state.records, ...action.payload.records],
      }
    case actionTypes.INBOX.REFRESH:
      return { ...initialState, isFetching: true }

    case actionTypes.INBOX.ERROR:
      return state

    default:
      return state
  }
}
