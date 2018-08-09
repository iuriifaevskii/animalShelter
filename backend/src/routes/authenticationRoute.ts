import {AuthenticationController} from "../controller/AuthenticationController";

import '../services/passport';
import * as passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});
const requireSignInGoogle = passport.authenticate('google',  {
    scope : ['profile', 'email']
});

const authenticationRoute = [{
    method: "get",
    route: "/auth/google",
    controller: AuthenticationController,
    action: "goToGoogle",
    middleware: requireSignInGoogle
}, {
    method: "get",
    route: "/auth/google/callback",
    controller: AuthenticationController,
    action: "googleCallback"
}, {
    method: "get",
    route: "/auth/checkToken",
    controller: AuthenticationController,
    action: "checkToken",
    middleware: requireAuth
}, {
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