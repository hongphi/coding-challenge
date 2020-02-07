import React, {Component} from "react";
import classNames from 'classnames';
import style from "../index.css"
import createReactClass from "create-react-class"
import {authStore} from "../stores/auth";
import {requestURL} from "../helpers/common";
import axios from "axios";

export var Login = createReactClass({
    getInitialState: function () {
        return {
            email: "",
            password: "",
            error: ""
        }
    },
    componentDidMount() {
        if (authStore.token) {
            this.props.history.replace("/")
        }
    },
    handleSubmit(event) {
        let url = requestURL('/login')
        axios.post(url, {email: this.state.email, password: this.state.password}).then((res) => {
            debugger
            localStorage.setItem('token', res.data.access_token)
            authStore.token = res.data.access_token;
            this.props.history.replace("/")
        }).catch(error => {
            if(error.response) {
                this.setState({error: error.response.data.error})
            }
        })
        event.preventDefault();
    },
    render() {
        return (
            <div className="d-flex" style={{minHeight: '100vh'}}>
                <div className={classNames({"login-bg": true, "col-7": true})}></div>
                <div className="col-5 d-flex justify-content-center h-100">
                    <div className="h-100" style={{marginTop: '50px', width: '70%'}}>
                        <img src="/static/logo@2x.jpg" style={{height: '30px'}}/>

                        <div className="d-flex flex-column h-100" style={{marginTop: '40%'}}>
                            <div className="">
                                <h2>Login</h2>
                                <p style={{fontSize: '150%'}}>Don't have account yet? <a href="/register">Sign Up</a></p>

                                <form onSubmit={this.handleSubmit}>
                                    {this.state.error != "" && <div className="form-group">
                                        <div className="invalid-feedback">{this.state.error}</div>
                                    </div>}
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control cus_input font-s" id="email"
                                               value={this.state.email} required
                                               onChange={e => this.setState({email: e.target.value})}
                                               placeholder="Enter your email address"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control cus_input font-s" id="password"
                                               value={this.state.password}  required
                                               onChange={e => this.setState({password: e.target.value})}
                                               placeholder="Enter your password"/>
                                    </div>
                                    <div className="form-group">
                                    <a href="/forget-password" className="font-s">Forget Password</a>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{width: '60%', padding: ".6rem .75rem"}}>LOGIN</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})
