import { all, takeLatest } from 'redux-saga/effects'

import * as actionCreators from '../actions'
import {addPlanet, loginSubmit, planetList, registrationSubmit} from './login'


export default function * rootSaga() {
    yield all([
        takeLatest(actionCreators.loginSubmit.type, loginSubmit),
        takeLatest(actionCreators.registrationSubmit.type, registrationSubmit),
        takeLatest(actionCreators.addPlanet.type, addPlanet),
        takeLatest(actionCreators.planetListInit.type, planetList)
    ])
}
