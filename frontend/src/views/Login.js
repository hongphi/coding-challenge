import React, {Component} from "react";
import classNames from 'classnames';
import style from "../index.css"
import createReactClass from "create-react-class"
import {authStore} from "../stores/auth";
import {requestURL} from "../helpers/common";
import axios from "axios";
import {observer} from "mobx-react";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        if (authStore.token) {
            this.props.history.replace("/")
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let url = requestURL('/login');
        this.setState({loading: true});
        axios.post(url, {email: this.state.email, password: this.state.password}).then((res) => {
            this.setState({loading: false});
            localStorage.setItem('token', res.data.token)
            authStore.set_token(res.data.token)
            authStore.set_user(res.data.user);
            this.props.history.replace("/")
        }).catch(error => {
            this.setState({loading: false});
            if(error.response) {
                this.setState({error: error.response.data.error})
            }
        })
    }

    render() {
        return (
            <div className="d-flex" style={{minHeight: '100vh'}}>
                <div className={classNames({"login-bg": true, "col-7": true})}></div>
                <div className="col-5 d-flex justify-content-center h-100">
                    <div className="h-100" style={{marginTop: '50px', width: '70%'}}>
                        <a href="/"><img src="/static/logo@2x.jpg" style={{height: '30px'}}/></a>

                        <div className="d-flex flex-column h-100" style={{marginTop: '30%'}}>
                            <div className="">
                                <h2>Login</h2>
                                <p style={{fontSize: '120%'}}>Don't have account yet? <a href="/register">Sign Up</a></p>

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
                                    <a href="/forgot-password" className="font-s">Forget Password</a>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={this.state.loading} style={{width: '60%', padding: ".6rem .75rem"}}>LOGIN</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
