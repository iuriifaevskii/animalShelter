import {
    Home,
    Signin,
    Profile,
    Signout
} from './pages';
import Header from './layouts';

export const routes = [
    { path: '', name: 'routerHome', components: {
        default: Home,
        'header-top': Header
    } },
    { path: '/signin', name: 'routerSignin', components: {
        default: Signin,
        'header-top': Header
    } }, 
    { path: '/profile', name: 'routerProfile', components: {
        default: Profile,
        'header-top': Header
    } },
    { path: '/signout', name: 'routerSignout', components: {
        default: Signout,
        'header-top': Header
    } },
];