import {getRepository} from "typeorm";
import * as passport from 'passport';
import {User} from '../entity/User';
import config from '../config';
import * as Jwt from 'passport-jwt';
import * as Local from 'passport-local';
import * as Google from 'passport-google-oauth';

const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;
const LocalStrategy = Local.Strategy;
const GoogleStrategy = Google.OAuth2Strategy;

// Create google strategy

const googleOptions = {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
};
const googleLogin = new GoogleStrategy(googleOptions, async (accessToken, refreshToken, profile, done) => {
    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne({googleId: profile.id.toString()});
    if(currentUser) {
        return done(null, currentUser);
    } else {
        const user = new User();
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user.email = profile.emails[0].value;
        user.password = '';
        user.age = 20;
        user.googleId = profile.id.toString();

        await userRepository.save(user);
        return done(null, user);
    }
});

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

passport.use(googleLogin);
passport.use(jwtLogin);
passport.use(localLogin);