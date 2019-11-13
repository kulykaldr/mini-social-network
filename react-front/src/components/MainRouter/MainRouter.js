import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from "../Home/Home";
import Signup from "../User/Signup";
import Signin from "../User/Signin";

const MainRouter = () => (
    <div>
        <Switch>
            <Route path='/signup' component={Signup}/>
            <Route path='/signin' component={Signin}/>
            <Route path='/' component={Home}/>
        </Switch>
    </div>
);

export default MainRouter;