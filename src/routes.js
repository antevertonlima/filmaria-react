import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos';
import Erro from './pages/Erro';

export default function Routes() {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Filme} path="/filme/:id" exact />
                <Route component={Favoritos} path="/favoritos" exact />

                <Route component={Erro} path="*" />
            </Switch>
        </BrowserRouter>
    )
}