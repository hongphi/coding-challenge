import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {authStore} from "./stores/auth";
import {PrivateRoute} from "./components/PrivateRoute";
import {Login} from "./views/Login";
import {Register} from "./views/Register";
import {ForgotPassword} from "./views/ForgotPassword";
import {ResetPassword} from "./views/ResetPassword";
import {Logout} from "./views/Logout";

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  auth: authStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
    (<Provider {...stores}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/logout" component={Logout}></Route>
                <Route path="/forgot-password" component={ForgotPassword}></Route>
                <Route path="/reset/:token" component={ResetPassword}></Route>
                <PrivateRoute path="/" component={App}></PrivateRoute>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
