import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { wrap } from './actions'
import rootSaga from './sagas'
import * as reducers from './reducers'
import { State } from './reducers/StateInterface'


const sagaMiddleware = createSagaMiddleware()

const { user, ...otherReducers } = reducers

export default function configureStore(preloadedState?: Partial<State>) {
    const store = wrap(createStore(
        combineReducers<State>({
            user: persistReducer({ key: 'user', storage }, user),
            ...otherReducers
        }),
        preloadedState,
        composeWithDevTools({})(applyMiddleware(sagaMiddleware))
    ))

    sagaMiddleware.run(rootSaga)

    return { store, persistor: persistStore(store) }
}