import React, {Component} from "react";
import classNames from 'classnames';
import style from "../index.css"
import createReactClass from "create-react-class"
import axios from "axios";
import {requestURL} from "../helpers/common";
import {authStore} from "../stores/auth";

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            gender: "",
            age: '',
            errors: {},
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
        let url = requestURL('/sign-up');
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            age: this.state.age
        }
        let that = this;
        this.setState({loading: true});
        axios.post(url, data).then((res) => {
            this.setState({loading: false});
            localStorage.setItem("token", res.data.access_token)
            authStore.user = res.data.user;
            authStore.set_token(res.data.access_token);
            that.props.history.replace('/')
        }).catch((error) => {
            if (error.response) {
                this.setState({errors: error.response.data, loading: false})
            }
        })
    }

    render() {
        let gender_options = [{value: 0, text: 'Female'}, {value: 1, text: 'Male'}]
        return (
            <div className="d-flex" style={{minHeight: '100vh'}}>
                <div className={classNames({"register-bg": true, "col-7": true})}></div>
                <div className="col-5 d-flex justify-content-center h-100">
                    <div className="h-100" style={{marginTop: '50px', width: '70%'}}>
                        <a href="/"><img src="/static/logo@2x.jpg" style={{height: '30px'}}/></a>

                        <div className="d-flex flex-column h-100" style={{marginTop: '20%'}}>
                            <div className="">
                                <h2>Login</h2>
                                <p style={{fontSize: '120%'}}>Already have an account? <a href="/login">LogIn</a></p>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="full_name">Full name</label>
                                        <input type="text" className="form-control cus_input font-s" id="full_name"
                                               value={this.state.name} required
                                               onChange={e => this.setState({name: e.target.value})}
                                               placeholder="First and last name"/>
                                        {this.state.errors.name != undefined && <div className="invalid-feedback">{this.state.errors.name.join(', ')}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" className="form-control cus_input font-s" id="email"
                                               value={this.state.email} required
                                               onChange={e => this.setState({email: e.target.value})}
                                               placeholder="Email address"/>
                                        {this.state.errors.email != undefined && <div className="invalid-feedback">{this.state.errors.email.join(', ')}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control cus_input font-s" id="password"
                                               value={this.state.password}  required
                                               onChange={e => this.setState({password: e.target.value})}
                                               placeholder="Enter your password"/>
                                               {this.state.errors.password != undefined && (<div className="invalid-feedback">{this.state.errors.password.join(", ")}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="age">Gender</label>
                                        <select className="form-control cus_input font-s" id="gender" value={this.state.gender}
                                            onChange={e => this.setState({gender: e.target.value})}>
                                            <option value="" disabled>Select gender</option>
                                            <option value="0">Female</option>
                                            <option value="1">Male</option>
                                        </select>
                                        {this.state.errors.gender != undefined && <div className="invalid-feedback">{this.state.errors.gender.join(', ')}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="age">Age</label>
                                        <input type="number" className="form-control cus_input font-s" id="age"
                                               value={this.state.age}  required
                                               onChange={e => this.setState({age: e.target.value})}
                                               placeholder="Age in number"/>
                                        {this.state.errors.age != undefined && <div className="invalid-feedback">{this.state.errors.age.join(', ')}</div>}
                                    </div>
                                    <button type="submit" className="btn btn-primary mb-4" disabled={this.state.loading} style={{width: '60%', padding: ".6rem .75rem"}}>REGISTER</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
