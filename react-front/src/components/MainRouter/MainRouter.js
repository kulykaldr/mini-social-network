import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Signup from "../Auth/Signup";
import Signin from "../Auth/Signin";
import Profile from "../Profile/Profile";
import Users from "../Users/Users";
import ProfileEdit from "../Profile/ProfileEdit";
import PrivateRoute from "./PrivateRoute";
import NewPost from "../Posts/NewPost";
import Post from "../Posts/Post";
import Home from "../Home/Home";
import EditPost from "../Posts/EditPost";

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/signin' component={Signin}/>
            <Route exact path='/user/:userId' component={Profile}/>
            <PrivateRoute exact path='/post/create' component={NewPost}/>
            <PrivateRoute exact path='/post/edit/:postId' component={EditPost}/>
            <Route exact path='/post/:postId' component={Post}/>
            <PrivateRoute exact path='/user/edit/:userId' component={ProfileEdit}/>
        </Switch>
    </div>
);

export default MainRouter;