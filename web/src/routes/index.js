import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Signin} />
                <Route path="/register" component={SignUp} />
                <Route path="/dashboard" component={Dashboard} isPrivate />
                <Route path="/profile" component={Profile} isPrivate />

                <Route
                    path="/"
                    component={() => <h1>Pagina não encontrada</h1>}
                />
            </Switch>
        </BrowserRouter>
    );
}
