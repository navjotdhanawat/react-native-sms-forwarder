import { combineReducers } from 'redux'
import inboxReducer from './inbox'

const reducer = combineReducers({
  inbox: inboxReducer,
})

export default reducer
