import { createReducer } from 'redux-from-void'
import { PersistState } from 'redux-persist/es/types'

import { loginSubmit, logout, registrationSubmit } from '../actions'


export interface UserState {
    login: string
    token: string | null
    userId: string
    _persist: PersistState
}

export const initState : UserState = {
    login: '',
    token: null,
    userId: '',
    _persist: null as any
}

export const reducer = createReducer(initState)(
    loginSubmit.success,
    registrationSubmit.success,
    (_: any, { payload }: any) => ({
        ...payload
    }),

    loginSubmit.failed,
    registrationSubmit.failed,
    logout,
    initState
)

