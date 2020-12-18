import React, { useState } from 'react'

import Modal from '../Modal'
import './LoginModal.css'
import { useSelector } from 'react-redux'
import { State } from '../../reducers/StateInterface'
import { LoginModalState } from '../../reducers/loginModal'
import { Registration } from './Registration'
import { Login } from './Login'
import { closeLoginModal } from '../../actions'


export default function LoginModal() {
    const [ step, setStep ] = useState<'login' | 'registration'>('login')
    const { isOpen } = useSelector<State, LoginModalState>(state => state.loginModal)

    const body = step === 'login' ? (
        <Login changeStep={ () => setStep('registration') }/>
    ) : (
        <Registration changeStep={ () => setStep('login') }/>
    )
    
    return (
        <Modal
            isOpen={ isOpen }
        >
            <div className="login-modal__wrapper">
                <span className="icon login-modal__close-icon" onClick={ closeLoginModal } />
                { body }
            </div>
        </Modal>
    )
}


export interface LoginAndRegistrationProps {
    changeStep: () => void
}