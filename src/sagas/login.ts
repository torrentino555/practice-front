import { call } from '@redux-saga/core/effects'
import { AxiosResponse } from 'axios'

import * as actions from '../actions'
import {addPlanetPost, loginPost, planetListGet, registrationPost} from '../api/login'
import { assertResponse } from '../utils/sagas'
import { LoginResponseDto } from '../dto/login'
import { UserState } from '../reducers/user'
import { RegistrationResponseDto } from '../dto/registration'


export function * loginSubmit({ payload: { login, password } }: any) {
    try {
        const response = yield call(loginPost, { username: login, password })

        assertResponse(response)
        const data : LoginResponseDto = response.data

        const payload : Partial<UserState> = { login, ...data }

        yield call(actions.loginSubmit.success, payload)
        document.location.reload()
    } catch ({ message }) {
        yield call(actions.loginSubmit.failed, { message })
    }
}

export function * registrationSubmit({ payload: { login, password, email } }: any) : any {
    try {
        const response : AxiosResponse<RegistrationResponseDto> = yield call(registrationPost, { username: login, password, email })

        assertResponse(response)

        yield call(actions.registrationSubmit.success, { login, email, ...response.data })
        document.location.reload()
    } catch ({ message }) {
        yield call(actions.registrationSubmit.failed, { message })
    }
}

export function * addPlanet({ payload: { name, weight } }: any) : any {
    try {
        const response = yield call(addPlanetPost, { name, weight })
        assertResponse(response)
        yield call(actions.addPlanet.success)
    } catch ({message}) {
        yield call(actions.addPlanet.failed, { message })
    }
}

export function * planetList() : any {
    try {
        const response = yield call(planetListGet)
        assertResponse(response)
        yield call(actions.planetListInit.success, { list: response.data })
    } catch ({message}) {
        yield call(actions.planetListInit.failed, { message })
    }
}