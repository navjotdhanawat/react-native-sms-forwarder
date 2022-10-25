import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import createSagaMiddleware from '@redux-saga/core'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const getStore = persistedReducer => {
  let applyMiddlewares = applyMiddleware(...middlewares)
  if (__DEV__) {
    middlewares.push(
      createLogger({ collapsed: true, duration: true, diff: false }),
    )
    applyMiddlewares = applyMiddleware(...middlewares)
  }
  console.log('persistedReducer', persistedReducer)
  return createStore(persistedReducer, applyMiddlewares)
}

const persistConfig = {
  key: 'main',
  storage: AsyncStorage,
  timeout: null,
  tranforms: [],
  blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = getStore(persistedReducer)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }
