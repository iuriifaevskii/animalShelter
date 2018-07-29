import {
    Home,
    Signin
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
    } }
];