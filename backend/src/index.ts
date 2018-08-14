import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as io from "socket.io";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import {Photo} from "./entity/Photo";
import {PhotoMetadata} from './entity/PhotoMetadata';
import {Album} from "./entity/Album";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    
    const server = new http.Server(app);
    const ioServer = io(server);

    // register express routes from defined application routes
    Routes.forEach(route => {
        const params = [route.route, route['middleware']]
            .filter(el => el);

        (app as any)[route.method](...params, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // start express server
    server.listen(3000);
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
    
    ioServer.on('connection', socket => {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', data => {
            console.log(data);
        });
    });
}).catch(error => console.log(error));
