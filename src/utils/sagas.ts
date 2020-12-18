import { AxiosResponse } from 'axios'
import { isNil } from 'ramda'
import { CommonResponseDto } from '../dto/common'


export const assertResponse = (response: AxiosResponse) => {
    if (isNil(response)) {
        throw new Error('Неизвестная ошибка сети')
    }

    if (response.status >= 300) {
        throw new Error('Неуспешный запрос. Код состояния HTTP: ' + response.status)
    }

    const responseData: CommonResponseDto = response.data

    if (!isNil(responseData.error)) {
        throw new Error(responseData.error)
    }
}