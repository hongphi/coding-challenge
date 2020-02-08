import React, {Component} from "react";
import classNames from "classnames";
import axios from "axios"
import {requestURL} from "../helpers/common";
import {useParams} from "react-router";

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            error: null,
            token: "",
            loading: false
        }
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }
    handleResetPassword(event) {
        event.preventDefault();
        this.setState({loading: true});
        axios.post(requestURL('/reset-password'), {
            password: this.state.password,
            reset_token: this.props.match.params.token
        }).then((res) => {
            this.setState({loading: false, error: null});
            alert("Your password changed.");
            this.props.history.replace('/login');
        }).catch(error => {
            if (error.response) {
                this.setState({loading: false, error: error.response.data.message});
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

                        <div className="d-flex flex-column h-100" style={{marginTop: '40%'}}>
                            <div className="">
                                <h2>Reset Password</h2>
                                <p>Please enter new password</p>

                                <form onSubmit={this.handleResetPassword}>
                                    {this.state.error != "" && <div className="form-group">
                                        <div className="invalid-feedback">{this.state.error}</div>
                                    </div>}
                                    <div className="form-group">
                                        <label htmlFor="email">Password</label>
                                        <input type="password" className="form-control cus_input font-s" id="email"
                                               value={this.state.password} required minLength={6}
                                               onChange={e => this.setState({password: e.target.value})}
                                               placeholder="Enter your password"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={this.state.loading} style={{width: '60%', padding: ".6rem .75rem"}}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}