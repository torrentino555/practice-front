import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {ROUTES} from '../../routes'
import {useSelector} from 'react-redux'
import {State} from '../../reducers/StateInterface'
import {isEmpty, isNil} from 'ramda'


export default function Main() {
    const token = useSelector((state: State) => state.user.token)

    if (isNil(token) || isEmpty(token))
        return (
            <Wrapper>
                <NeedLogin>
                    Нужно залогиниться!
                </NeedLogin>
            </Wrapper>
        )

    return (
        <Wrapper>
            <Button to={ ROUTES.addPlanet }>
                Добавить планету
            </Button>
            <Button to={ ROUTES.planetList }>
                Список планет
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    
    > * + * {
        margin-top: 20px;
    }
`

const Button = styled(NavLink)`
    padding: 20px;
    background-color: lightblue;
    color: black;
    border-radius: 17px;
    font-size: 20px;
    width: 600px;
`

const NeedLogin = styled.div`
    padding: 20px;
    color: RED;
    font-size: 30px;
`