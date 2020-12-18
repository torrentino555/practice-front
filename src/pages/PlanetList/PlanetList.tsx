import React, {useEffect} from 'react'
import {planetListInit} from '../../actions'
import {ROUTES} from '../../routes'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {State} from '../../reducers/StateInterface'


export default function PlanetList() {
    const planets = useSelector((state: State) => state.addPlanet.planetList)
    useEffect(() => {
        planetListInit()
    }, [])


    return (
        <>
            <NavLink to={ ROUTES.root }>Назад</NavLink>
            <Wrapper>
                { planets.map((planet, i) => (
                    <Planet key={ i }>
                        <span>Имя планеты: { planet.name }</span>
                        <hr/>
                        <span>Вес: { planet.weight }</span>
                    </Planet>
                )) }
            </Wrapper>
        </>
    )
}

const Planet = styled.div`
    margin: 10px 0;
    padding: 10px;
    border-radius: 7px;
    background-color: rgba(0,255,255,0.59);
    width: 600px;
    display: flex;
    flex-direction: column;
    
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`