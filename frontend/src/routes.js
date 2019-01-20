import store from './store'
import {
    Home,
    Signin,
    Profile,
    Signout,
    Signup
} from './pages';
import Header from './layouts';

const ifNotAuthenticated = (to, from, next) => {
    store.dispatch('isSignIn', localStorage.getItem('token'))
        .then(response => {
            if (store.getters.authenticated) {
                next('/')
                return
            }
            next()
            return
        })
        .catch(e => next());
}

const ifAuthenticated = (to, from, next) => {
    if (to.name === 'routerProfile' && to.query.access_token) {
        localStorage.setItem('token', to.query.access_token);
    }
    store.dispatch('isSignIn', localStorage.getItem('token'))
        .then(response => {
            if (store.getters.authenticated) {
                next()
                return
            }
            next('/signin')
        })
        .catch(e => next('/signin'));
}

const availableToAll = (to, from, next) => {
    store.dispatch('isSignIn', localStorage.getItem('token'))
        .then(response => {
            next();
            return
        })
        .catch(e => next());
}

export const routes = [
    { path: '', name: 'routerHome', beforeEnter: availableToAll, components: {
        default: Home,
        'header-top': Header
    } },
    { path: '/signin', name: 'routerSignin', beforeEnter: ifNotAuthenticated, components: {
        default: Signin,
        'header-top': Header
    } }, 
    { path: '/profile', name: 'routerProfile', beforeEnter: ifNotAuthenticated, components: {
        default: Profile,
        'header-top': Header
    } },
    { path: '/signout', name: 'routerSignout', components: {
        default: Signout,
        'header-top': Header
    } },
    { path: '/signup', name: 'routerSignup', beforeEnter: ifNotAuthenticated, components: {
        default: Signup,
        'header-top': Header
    } }
];