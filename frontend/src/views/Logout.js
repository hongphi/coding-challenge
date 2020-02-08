import React, {Component} from "react";
import {authStore} from "../stores/auth";

export class Logout extends Component {
    componentDidMount() {
        authStore.logout();
        this.props.history.push('/login')
    }
    render() {
        return (
            <div></div>
        )
    }
}
