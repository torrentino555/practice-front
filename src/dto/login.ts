import { CommonResponseDto } from './common'


export interface LoginRequestDto {
    username: string
    password: string
}

export interface LoginResponseDto extends CommonResponseDto {
    token: string
    userId: string
}