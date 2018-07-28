import userRoute  from './routes/userRoute';
import photoRoute from './routes/photoRoute';
import albumRoute from './routes/albumRoute';
import authenticationRoute from './routes/authenticationRoute';

export const Routes = [
    ...authenticationRoute,
    ...userRoute,
    ...photoRoute,
    ...albumRoute
];
