import React from 'react'

import './Loader.css'


interface Props {
    active: boolean
}

export default function Loader({ active }: Props) {
    if (!active) {
        return null
    }

    return (
        <div className="loader" />
    )
}