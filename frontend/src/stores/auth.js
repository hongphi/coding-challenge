import {observable, decorate, action} from "mobx"
import axios from "axios";
import {requestURL} from "../helpers/common";

class AuthStore {
    constructor() {
        this.set_token(localStorage.getItem("token") || null)
    }
    user = null;
    token = null;

    @action logout() {
        localStorage.removeItem('token');
        this.set_token(null);
        this.set_token(null)
    }

    @action set_token(token) {
        this.token = token;
        if (token) {
             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         } else {
             axios.defaults.headers.common['Authorization'] = null;
         }
    }

    @action set_user(user) {
        this.user = user;
    }

    @action async get_user() {
        if (this.user) {
            return this.user
        }
        if (this.token) {
            return new Promise((resolve, reject) => {
                axios.get(requestURL('/me')).then(res => {
                    resolve(res.data.user)
                }).catch(error => {
                    this.set_token(null);
                    reject()
                })
            })

        }
    }
}

decorate(AuthStore, {
    user: observable,
    token: observable
})

export const authStore = new AuthStore();