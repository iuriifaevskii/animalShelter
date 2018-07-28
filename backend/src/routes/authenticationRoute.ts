import {AuthenticationController} from "../controller/AuthenticationController";

import '../services/passport';
import * as passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

const authenticationRoute = [{
    method: "get",
    route: "/",
    controller: AuthenticationController,
    action: "goToHome",
    middleware: requireAuth
}, {
    method: "post",
    route: "/signup",
    controller: AuthenticationController,
    action: "signup"
}, {
    method: "post",
    route: "/signin",
    controller: AuthenticationController,
    action: "signin",
    middleware: requireSignin
}];

export default authenticationRoute;