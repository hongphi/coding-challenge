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
import {Login} from "./components/Login";
import {Register} from "./components/Register";

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
                <PrivateRoute path="/" component={App}></PrivateRoute>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
