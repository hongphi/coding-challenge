import React, {Component} from "react";
import classNames from "classnames";
import axios from "axios"
import {requestURL} from "../helpers/common";

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: false,
            message: "",
            loading: false
        }
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }
    handleResetPassword(event) {
        event.preventDefault();
        this.setState({loading: true});
        axios.post(requestURL('/forgot-password'), {email: this.state.email}).then((res) => {
            this.setState({
                loading: false,
                error: false,
                message: "Email reset password sent."
            });
        }).catch(error => {
            debugger
            this.setState({
                loading: false,
                 error: true,
                message: error.response.data.message
            });
        })
    }
    render() {
        return (
            <div className="d-flex" style={{minHeight: '100vh'}}>
                <div className={classNames({"login-bg": true, "col-7": true})}></div>
                <div className="col-5 d-flex justify-content-center h-100">
                    <div className="h-100" style={{marginTop: '50px', width: '70%'}}>
                        <a href="/"><img src="/static/logo@2x.jpg" style={{height: '30px'}}/></a>

                        <div className="d-flex flex-column h-100" style={{marginTop: '40%'}}>
                            <div className="">
                                <h2>Forgot Password</h2>
                                <p>Please enter your email to reset password</p>

                                <form onSubmit={this.handleResetPassword}>
                                    {this.state.message != "" && <div className="form-group">
                                        <div className={this.state.error?'invalid-feedback': "valid-feedback"}>{this.state.message}</div>
                                    </div>}
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control cus_input font-s" id="email"
                                               value={this.state.email} required
                                               onChange={e => this.setState({email: e.target.value})}
                                               placeholder="Enter your email address"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={this.state.loading} style={{width: '60%', padding: ".6rem .75rem"}}>Reset password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}