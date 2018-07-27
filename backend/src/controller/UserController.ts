import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return await this.userRepository.save(request.body);
    }

    /* 
    // body example: id and one aditional param
    var body = {
	    "id": 5,
        "firstName": "Andrew"
    }
    */
    async edit(request: Request, response: Response, next: NextFunction) {
        let {body} = request;
        let userToUpdate = await this.userRepository.findOne({id: body.id});
        
        Object.entries(userToUpdate).forEach(([key, value]) => {
            if(Object.keys(body).find(el => el === key)) {
                userToUpdate[key] = body[key];
            }
        });
        
        return await this.userRepository.save(userToUpdate);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let user = await this.userRepository.findOne({id: request.params.id});
        
        return await this.userRepository.remove(user);
    }
}