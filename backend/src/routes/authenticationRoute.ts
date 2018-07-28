import {AuthenticationController} from "../controller/AuthenticationController";

import '../services/passport';
import * as passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session: false});

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
}];

export default authenticationRoute;