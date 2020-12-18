import React, {useEffect} from 'react'
import {useFormik} from 'formik'
import {isEmpty} from 'ramda'
import {addPlanet, resetComplete} from '../../actions'
import {useSelector} from 'react-redux'
import {State} from '../../reducers/StateInterface'
import Loader from '../../components/Loader'
import {NavLink} from 'react-router-dom'
import {ROUTES} from '../../routes'


const initialValues = {
    name: '',
    weight: ''
}

export default function AddPlanet() {
    const { isLoading, complete } = useSelector((state: State) => state.addPlanet)

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: values => void addPlanet(values)
    })

    useEffect(() => {
        if (complete) {
            setTimeout(() => resetComplete(), 3000)
        }
    }, [ isLoading, complete ])

    return (
        <>
            <NavLink to={ ROUTES.root }>Назад</NavLink>
            <form onSubmit={ formik.handleSubmit }>
                <label className="login-modal__label">
                    Имя планеты
                    <input
                        placeholder="Введите имя..."
                        name="name"
                        value={ formik.values.name }
                        onChange={ formik.handleChange }
                        onBlur={formik.handleBlur}
                    />
                </label>
                <span className="login-modal__error">
                    { formik.touched.name && formik.errors.name }
                </span>
                <label className="login-modal__label">
                    Масса планеты (10^24кг)
                    <input
                        placeholder="Введите массу..."
                        name="weight"
                        value={ formik.values.weight }
                        onChange={ formik.handleChange }
                        onBlur={formik.handleBlur}
                    />
                </label>
                <span className="login-modal__error">
                    { formik.touched.weight && formik.errors.weight }
                </span>
                <br/>
                <button className="login-modal__button" type="submit">
                    Добавить
                </button>
                <div className="login-modal__loader">
                    <Loader active={ isLoading }/>
                </div>
                { complete && <div>Запись добавлена</div> }
            </form>
        </>
    )

    function validate({ name, weight }: typeof initialValues) {
        const errors : Partial<typeof initialValues> = {}

        if (isEmpty(name)) {
            errors.name = 'Обязательное поле'
        }

        if (isEmpty(weight)) {
            errors.weight = 'Обязательное поле'
        } else if (!/[0-9]+\.?[0-9]*/g.test(weight)) {
            errors.weight = 'Неверный формат, пример верного: 1, 2, 3.02'
        }

        return errors
    }
}