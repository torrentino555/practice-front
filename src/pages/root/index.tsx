import React from 'react'
import './index.css'
import Header from '../../components/Header'
import {ROUTES} from '../../routes'
import {Redirect, Route, Switch} from 'react-router'
import AddPlanet from '../AddPlanet'
import PlanetList from '../PlanetList'
import Main from '../Main'
import {useSelector} from 'react-redux'
import {State} from '../../reducers/StateInterface'
import {isEmpty, isNil} from 'ramda'


export default function Root() {
    const token = useSelector((state: State) => state.user.token)
    const login = !isNil(token) && !isEmpty(token)

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path={ [ ROUTES.root ] }>
                    <Main/>
                </Route>
                { login ? (
                    <>
                        <Route exact path={ [ ROUTES.addPlanet ] }>
                            <AddPlanet/>
                        </Route>
                        <Route exact path={ [ ROUTES.planetList ] }>
                        <PlanetList/>
                        </Route>
                    </>
                ) : (
                    <Redirect to={ ROUTES.root } />
                ) }
            </Switch>
        </div>
    )
}