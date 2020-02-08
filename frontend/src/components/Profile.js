import React, {Component} from 'react';
import createReactClass from "create-react-class";
import {authStore} from "../stores/auth";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        authStore.get_user().then((user) => {
            this.setState({user: user})
        })
    }

    render() {
        let user = this.state.user;
        return (
            <div className="home h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="position-relative box-profile align-self-center">
                        <img className="position-absolute d-flex avatar" src="/static/dp@2x.jpg"/>
                         <ul className="mt-5 profile-details">
                             <li>
                                 <div className="field_name" >Full name</div>
                                 <div className="field_value">{user.name}</div>
                             </li>
                             <li>
                                 <div className="field_name" >Email</div>
                                 <div className="field_value">{user.email}</div>
                             </li>
                             <li>
                                 <div className="field_name" >Gender</div>
                                 <div className="field_value">{user.gender == 0 ? 'Female': 'Male'}</div>
                             </li>
                             <li>
                                 <div className="field_name" >Age</div>
                                 <div className="field_value">{user.age} years</div>
                             </li>
                         </ul>
                    </div>
                </div>

            </div>
        )
    }
}