import {get, post} from './config'


export const loginPost = (data: { username: string, password: string }) =>
    post('/login/', data)

export const registrationPost = (data: { username: string, password: string, email: string }) =>
    post('/register/', data)

export const addPlanetPost = (data: { name: string, weight: string }) =>
    post('/addPlanet/', data)

export const planetListGet = () =>
    get('/planetList/')