import { actionTypes } from '../constant'

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.INBOX.REQUEST:
      return state

    case actionTypes.INBOX.RESPONSE:
      return state

    case actionTypes.INBOX.ERROR:
      return state

    default:
      return state
  }
}
