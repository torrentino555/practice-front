import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {selectUserName} from '../selectors/user'
import {isEmpty} from 'ramda'
import {logout, openLoginModal} from '../actions'
import Popup from 'reactjs-popup'
import LoginModal from './LoginModal'
import './Header.css'


export default function Header() {
    return (
        <header className="header">
            <div className="header__logo-text">
                Перечень планет
            </div>
            <User/>
            <LoginModal/>
        </header>
    )
}

function User() {
    const name = useSelector(selectUserName)
    const [ popupOpen, setPopupOpen ] = useState(false)

    if (isEmpty(name)) {
        return (
            <div className="header-user__unknown" onClick={ openLoginModal } >
                Войти
            </div>
        )
    }

    return (
        <Popup
            open={ popupOpen }
            onOpen={ () => setPopupOpen(true) }
            onClose={ () => setPopupOpen(false) }
            className="header-user__popup"
            position="bottom center"
            trigger={ (
                <div className="header-user">
                    { name }
                </div>
            ) }
        >
            <div
                onClick={ () => {
                    logout()
                    setPopupOpen(false)
                } }
                className="header-user__logout"
            >
                Выйти
            </div>
        </Popup>
    )
}