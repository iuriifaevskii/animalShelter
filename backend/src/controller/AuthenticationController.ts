import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import * as jwt from 'jwt-simple';
import * as passport from 'passport';
import config from '../config';

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

export class AuthenticationController {

    private userRepository = getRepository(User);

    goToGoogle(request: Request, response: Response, next: NextFunction) {
        return {message: 'go to google!'};
    }

    googleCallback(request: Request, response: Response, next: NextFunction) {
        return passport.authenticate('google', {session: false}, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return response.status(403).send('Unauthorized');
        }
        return response.redirect(`http://localhost:8080/profile?access_token=${tokenForUser(user)}`);
        })(request, response, next);
    }

    goToHome(request: Request, response: Response, next: NextFunction) {
        return response.req.user;
    }

    async signup(request: Request, response: Response, next: NextFunction) {
        const email = request.body.email;
        const password = request.body.password;

        if(!email || !password) {
            response.status(422).send({error: 'you must provide email and password'});
            return;
        }

        const existingUser = await this.userRepository.findOne({email: email});
        if (existingUser) {
            response.status(422).send({error: 'email is in use'});
            return;
        }
        
        const user = new User();
        user.email = email;
        user.password = password;
        user.googleId = '';
        await this.userRepository.save(user);

        return {token: tokenForUser(user)};
    }

    async signin(request: Request, response: Response, next: NextFunction) {
        // user has already had their email and password auth'd
        // we just need to give them a token
        return {token: tokenForUser(request.user)};
    }

    async checkToken(request: Request, response: Response, next: NextFunction) {
        return true;
    }
}
