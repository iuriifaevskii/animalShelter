import {getRepository} from "typeorm";
import * as passport from 'passport';
import {User} from '../entity/User';
import config from '../config';
import * as Jwt from 'passport-jwt';
import * as Local from 'passport-local';

const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;
const LocalStrategy = Local.Strategy;

// Create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    // Verify this email and password, call done with the user 
    // if it's the correct email and password
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({email: email});
    if(!user) {
        return done(null, false);
    }
    // compare password - is 'password' equel to user.password
    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        return done(null, false);
    }
    return done(null, user);
});


// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
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
passport.use(localLogin);