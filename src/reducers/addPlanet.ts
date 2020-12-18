import {createReducer} from 'redux-from-void'
import {addPlanet, planetListInit, resetComplete} from '../actions'


export interface AddPlanetState {
    isLoading: boolean
    complete: boolean
    planetList: {name: string, weight: string}[]
}

export const initState : AddPlanetState = {
    isLoading: false,
    complete: false,
    planetList: []
}

export const reducer = createReducer(initState)(
    addPlanet,
    planetListInit,
    () => ({
        isLoading: true
    }),

    addPlanet.success,
    () => ({
        isLoading: false,
        complete: true
    }),

    planetListInit.success,
    (_: any, { payload: { list } }: any) => ({
        isLoading: false,
        complete: true,
        planetList: list
    }),

    resetComplete,
    () => ({
        complete: false
    }),

    addPlanet.failed,
    planetListInit.failed,
    initState
)