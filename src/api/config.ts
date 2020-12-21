import axios, { AxiosRequestConfig } from 'axios'
import { isEmpty, isNil } from 'ramda'


const SERVER_URL = "http://127.0.0.1:8000/api"

axios.interceptors.request.use(request => {
    let token : null | string = null
    let userId : null | string = null
    try {
        token = JSON.parse(localStorage[ 'persist:user' ]).token
        userId = JSON.parse(localStorage[ 'persist:user' ]).userId
    } catch (e) {

    }

    if (!isNil(token) && !isEmpty(token) && token !== 'null')
        request.headers.token = `${ token.substr(1, token.length - 2) }`
    if (!isNil(userId) && !isEmpty(userId) && userId !== 'null')
        request.headers['user-id'] = `${ userId.substr(1, userId.length - 2) }`

    return request
})

export const post = (url: string, values?: any, config?: AxiosRequestConfig) =>
    axios.post(SERVER_URL + url, values, config)
export const get = (url: string) => axios.get(SERVER_URL + url)


export const mockPost = (responseBody: Object = {}) : Promise<any> =>
    new Promise<any>(resolve => resolve({
        data: responseBody
    }))