import React from 'react'
import './index.css'
import Header from '../../components/Header'
import {ROUTES} from '../../routes'
import { Route, Switch } from 'react-router'
import AddPlanet from '../AddPlanet'
import PlanetList from '../PlanetList'
import Main from '../Main'


export default function Root() {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path={ [ ROUTES.root ] }>
                    <Main/>
                </Route>
                <Route exact path={ [ ROUTES.addPlanet ] }>
                    <AddPlanet/>
                </Route>
                <Route exact path={ [ ROUTES.planetList ] }>
                    <PlanetList/>
                </Route>
            </Switch>
        </div>
    )
}