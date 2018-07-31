import {store} from './store'
import {
    Home,
    Signin,
    Profile,
    Signout,
    Signup
} from './pages';
import Header from './layouts';

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.authenticated) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.authenticated) {
        next()
        return
    }
    next('/signin')
}

export const routes = [
    { path: '', name: 'routerHome', components: {
        default: Home,
        'header-top': Header
    } },
    { path: '/signin', name: 'routerSignin', beforeEnter: ifNotAuthenticated, components: {
        default: Signin,
        'header-top': Header
    } }, 
    { path: '/profile', name: 'routerProfile', beforeEnter: ifAuthenticated, components: {
        default: Profile,
        'header-top': Header
    } },
    { path: '/signout', name: 'routerSignout', beforeEnter: ifAuthenticated, components: {
        default: Signout,
        'header-top': Header
    } },
    { path: '/signup', name: 'routerSignup', beforeEnter: ifNotAuthenticated, components: {
        default: Signup,
        'header-top': Header
    } }
];