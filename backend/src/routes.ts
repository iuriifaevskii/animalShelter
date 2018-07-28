import userRoute  from './routes/userRoute';
import photoRoute from './routes/photoRoute';
import albumRoute from './routes/albumRoute';

export const Routes = [
    ...userRoute,
    ...photoRoute,
    ...albumRoute
];
