import {UserState} from './user'
import {LoginModalState} from './loginModal'
import {AddPlanetState} from './addPlanet'


export interface State {
    user: UserState,
    loginModal: LoginModalState,
    addPlanet: AddPlanetState
}