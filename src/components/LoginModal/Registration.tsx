import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { isEmpty } from 'ramda'
import React from 'react'

import { State } from '../../reducers/StateInterface'
import { LoginModalState } from '../../reducers/loginModal'
import { registrationSubmit } from '../../actions'
import Loader from '../Loader'
import { LOGIN_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '../../constants'
import { LoginAndRegistrationProps } from './LoginModal'


const initialValues = {
    login: '',
    password: '',
    email: '',
    repeatPassword: ''
}

export function Registration({ changeStep }: LoginAndRegistrationProps) {
    const { isLoading, error } = useSelector<State, LoginModalState>(state => state.loginModal)

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: values => void registrationSubmit(values)
    })

    return (
        <form onSubmit={ formik.handleSubmit } className="login-modal">
            <div className="login-modal__header">
                <h2 className="login-modal__h1">Регистрация</h2>
                <h2
                    onClick={ changeStep }
                    className="login-modal__h1 login-modal__link"
                >
                    Вход
                </h2>
            </div>
            <hr className="login-modal__hr"/>
            <label className="login-modal__label">
                Логин
                <input
                    placeholder="Введите логин..."
                    name="login"
                    value={ formik.values.login }
                    onChange={ formik.handleChange }
                    onBlur={formik.handleBlur}
                />
            </label>
            <span className="login-modal__error">
                { formik.touched.login && formik.errors.login }
            </span>
            <label className="login-modal__label">
                Email
                <input
                    placeholder="Введите email..."
                    name="email"
                    value={ formik.values.email }
                    onChange={ formik.handleChange }
                    onBlur={formik.handleBlur}
                />
            </label>
            <span className="login-modal__error">
                { formik.touched.email && formik.errors.email }
            </span>
            <label className="login-modal__label">
                Пароль
                <input
                    placeholder="Введите пароль..."
                    name="password"
                    type="password"
                    value={ formik.values.password }
                    onChange={ formik.handleChange }
                    onBlur={formik.handleBlur}
                />
            </label>
            <span className="login-modal__error">
                { formik.touched.password && formik.errors.password }
            </span>
            <label className="login-modal__label">
                Повторите пароль
                <input
                    placeholder="Повторите пароль..."
                    name="repeatPassword"
                    type="password"
                    value={ formik.values.repeatPassword }
                    onChange={ formik.handleChange }
                    onBlur={formik.handleBlur}
                />
            </label>
            <span className="login-modal__error">
                { formik.touched.repeatPassword && formik.errors.repeatPassword }
            </span>
            <div className="login-modal__loader">
                <Loader active={ isLoading }/>
            </div>
            { error && (
                <div className="login-modal__server-error">
                    { error }
                </div>
            ) }
            <button className="login-modal__button" type="submit">
                Войти
            </button>
        </form>
    )

    function validate({ login, password, email, repeatPassword } : typeof initialValues) {
        const errors : Partial<typeof initialValues> = {}

        if (isEmpty(login)) {
            errors.login = 'Обязательное поле'
        } else if (!/^[a-zA-Z0-9]+$/g.test(login)) {
            errors.login = 'Допустимы только английские буквы и цифры'
        } else if (login.length < LOGIN_MIN_LENGTH) {
            errors.login = `Минимальная длина - ${ LOGIN_MIN_LENGTH } символов`
        }

        if (isEmpty(email)) {
            errors.email = 'Обязательное поле'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = 'Неверный email адрес'
        }

        if (isEmpty(password)) {
            errors.password = 'Обязательное поле'
        } else if (password.length < PASSWORD_MIN_LENGTH) {
            errors.password = `Минимальная длина - ${ PASSWORD_MIN_LENGTH } символов`
        }

        if (isEmpty(repeatPassword)) {
            errors.repeatPassword = 'Обязательное поле'
        } else if (password !== repeatPassword) {
            errors.repeatPassword = 'Пароли не совпадают'
        }

        return errors
    }
}