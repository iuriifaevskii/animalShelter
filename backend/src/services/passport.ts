import {getRepository} from "typeorm";
import * as passport from 'passport';
import {User} from '../entity/User';
import config from '../config';
import * as Jwt from 'passport-jwt';

const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;

// Setup options for JWT Strategy
const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(JwtOptions, async (payload, done) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({id: payload.sub});
    if(user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

// Tell pasport to use this strategy
passport.use(jwtLogin);
