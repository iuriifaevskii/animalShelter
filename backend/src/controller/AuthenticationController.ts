import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import * as jwt from 'jwt-simple';
import config from '../config';

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

export class AuthenticationController {

    private userRepository = getRepository(User);

    goToHome(request: Request, response: Response, next: NextFunction) {
        return {hi: 'there'};
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
        await this.userRepository.save(user);

        return {token: tokenForUser(user)};
    }
}
