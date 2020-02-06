import { observable, decorate } from "mobx"

class AuthStore {
    user = null;
    token = localStorage.getItem("token") || null;
}

decorate(AuthStore, {
    user: observable,
    token: observable
})

export const authStore = new AuthStore();