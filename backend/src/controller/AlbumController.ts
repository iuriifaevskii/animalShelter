import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Album} from "../entity/Album";

export class AlbumController {

    private albumRepository = getRepository(Album);

    async all(request: Request, response: Response, next: NextFunction) {
        const page = request.query.page;
        const currentPage = page && Number(page) <= 0 ? 1 : page;
        const perPage = request.query.per_page || 10;

        const albums = await this.albumRepository
            .createQueryBuilder("album")
            .leftJoinAndSelect("album.photos", "photos")
            .leftJoinAndSelect("photos.author", "author")
            .leftJoinAndSelect("photos.metadata", "metadata")
            .skip((currentPage - 1) * perPage)
            .take(perPage)
            .getManyAndCount();

        const lastPage = Math.ceil(Number(albums[1])/Number(perPage));

        return {
            pagination: {
                'total': Number(albums[1]),
                'per_page': Number(perPage),
                'current_page': Number(currentPage),
                'last_page': lastPage,
                'from': 1,
                'to': lastPage
            },
            data: albums[0]
        };
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.albumRepository.findOne(request.params.id) || false;
    }

    // create album using sockets
    // post request: http://localhost:3000/albums
    /*
    {
	    "name": "new album",
	    "photos": []
    }
    */
    async save(request: Request, response: Response, next: NextFunction) {
        request['io'].emit('ADD_ALBUM', request.body);
        return await this.albumRepository.save(request.body);
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
        let albumToUpdate = await this.albumRepository.findOne({id: body.id});
        
        Object.entries(albumToUpdate).forEach(([key, value]) => {
            if(Object.keys(body).find(el => el === key)) {
                albumToUpdate[key] = body[key];
            }
        });
        
        return await this.albumRepository.save(albumToUpdate);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let album = await this.albumRepository.findOne({id: request.params.id});
        return album ? await this.albumRepository.remove(album) : false;
    }
}
