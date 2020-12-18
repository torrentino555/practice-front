import React, { PropsWithChildren } from 'react'
import cn from 'classnames'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import './Modal.css'


interface Props {
    isOpen?: boolean
    className?: string
}

export default function Modal({
    isOpen,
    className,
    children
}: PropsWithChildren<Props>) {
    return (
        <Popup
            modal
            open={ isOpen }
            closeOnDocumentClick={ false }
            closeOnEscape={ false }
            className={ cn('modal', className) }
        >
            { children as JSX.Element }
        </Popup>
    )
}