import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    );
}
