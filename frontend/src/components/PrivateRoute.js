import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {inject} from "mobx-react";
import {authStore} from "../stores/auth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const token = authStore.token;
        if (!token) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)