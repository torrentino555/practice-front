import { createReducer } from 'redux-from-void'
import { closeLoginModal, loginSubmit, openLoginModal, registrationSubmit } from '../actions'


export interface LoginModalState {
    isOpen: boolean
    isLoading: boolean
    error: string
}

export const initState : LoginModalState = { isOpen: false, isLoading: false, error: '' }

export const reducer = createReducer(initState)(
    openLoginModal,
    () => ({
        isOpen: true
    }),

    loginSubmit,
    registrationSubmit,
    () => ({
        isLoading: true,
        error: ''
    }),

    loginSubmit.success,
    registrationSubmit.success,
    () => ({
        isLoading: false,
        isOpen: false
    }),

    loginSubmit.failed,
    registrationSubmit.failed,
    (_: any, { payload: { message } }: any) => ({
        isLoading: false,
        error: message
    }),

    closeLoginModal,
    initState
)