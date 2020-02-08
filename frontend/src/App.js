import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Profile} from "./components/Profile";
import {Route} from "react-router";
import {authStore} from "./stores/auth";

@inject('routing')
@observer
class App extends Component {
    render() {
        const {location, push, goBack} = this.props.routing;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        <img src="/static/logo@2x.jpg" style={{height: '20px'}}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="javascript:void(0)" className="nav-link" href="/logout" tabIndex="-1" aria-disabled="true">
                                    <i className="icon icon-logout"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <SideNav className="sidebar"
                    expanded={true}
                    onSelect={(selected) => {
                        const to = '/' + selected;
                        if (location.pathname !== to) {
                            this.props.history.push(to);
                        }
                    }}>
                    <SideNav.Nav defaultSelected="profile">
                        <NavItem navitemClassName="nav-item" eventKey="dashboard">
                            <NavIcon>
                                <i className="icon icon-dashboard"/>
                            </NavIcon>
                            <NavText className="nav-text">
                                Dashboard
                            </NavText>
                        </NavItem>
                        <NavItem navitemClassName="nav-item" eventKey="incoming-enquiries">
                            <NavIcon>
                                <i className="icon icon-enquiries"/>
                            </NavIcon>
                            <NavText className="nav-text">
                                Incoming Enquiries
                            </NavText>
                        </NavItem>
                        <NavItem navitemClassName="nav-item" eventKey="incoming-quotations">
                            <NavIcon>
                                <i className="icon icon-quotations"/>
                            </NavIcon>
                            <NavText className="nav-text">
                                Incoming Quotations
                            </NavText>
                        </NavItem>
                        <NavItem navitemClassName="nav-item" eventKey="products">
                            <NavIcon>
                                <i className="icon icon-product"/>
                            </NavIcon>
                            <NavText className="nav-text">
                                Products
                            </NavText>
                        </NavItem>
                        <NavItem navitemClassName="nav-item" eventKey="my-request">
                            <NavIcon>
                                <i className="icon icon-request"/>
                            </NavIcon>
                            <NavText className="nav-text">
                                My Request
                            </NavText>
                        </NavItem>
                        <NavItem navitemClassName="nav-item" eventKey="order-history">
                            <NavIcon>
                                <i className="icon icon-order"/>
                            </NavIcon>
                            <NavText className="nav-text">
                                Order History
                            </NavText>
                        </NavItem>
                        <NavItem navitemClassName="nav-item" eventKey="profile">
                            <NavIcon>
                                <i className="icon icon-profile"/>
                            </NavIcon>
                            <NavText className="nav-text">
                                Profile
                            </NavText>
                        </NavItem>
                        <NavItem navitemClassName="nav-item" eventKey="settings">
                            <NavIcon>
                                <i className="icon icon-settings"/>
                            </NavIcon>
                            <NavText className="nav-text">
                                Settings
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>

                <main>
                    <Route path="/" exact component={props => <Profile />} />
                    <Route path="/profile" exact component={props => <Profile />} />
                </main>
            </div>
        );
    }
}

export default App