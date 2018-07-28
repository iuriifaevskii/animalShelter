import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Photo} from '../entity/Photo';
import {PhotoMetadata} from '../entity/PhotoMetadata';
import {User} from "../entity/User";
import {Author} from "../entity/Author";
import {Album} from "../entity/Album";

export class PhotoController {
    private photoRepository = getRepository(Photo);
    private photoMetadataRepo = getRepository(PhotoMetadata);
    private authorRepository = getRepository(Author);
    private albumRepository = getRepository(Album);

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.photoRepository
            .createQueryBuilder("photo")
            .innerJoinAndSelect("photo.metadata", "metadata")
            .leftJoinAndSelect("photo.albums", "albums")
            .leftJoinAndSelect("photo.author", "author")
            .getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.photoRepository
            .createQueryBuilder("photo")
            .innerJoinAndSelect("photo.metadata", "metadata")
            .leftJoinAndSelect("photo.albums", "albums")
            .leftJoinAndSelect("photo.author", "author")
            .where("photo.id = :id", { id: request.params.id })
            .getOne() || false;
    }
    
    /*
    test body
    {
        "name": "testPhoto",
        "description": "this is photo",
        "filename": "test.jpg",
        "isPublished": false,
        "views": 4
    }
    */
    async save(request: Request, response: Response, next: NextFunction) {
        const authorId = 3;
        const albumIds = [3, 2, 5];

        const allAlbums = await this.albumRepository.find();
        const albums = allAlbums.filter(album => albumIds.indexOf(album.id) !== -1);

        const author = await this.authorRepository.findOne({id: authorId});

        let photo = new Photo();
        photo = request.body;

        let metadata = new PhotoMetadata();
        metadata.height = 640;
        metadata.width = 480;
        metadata.compressed = true;
        metadata.comment = "cybershoot";
        metadata.orientation = "portait";
    
        photo.metadata = metadata;
        photo.author = author;
        photo.albums = albums;

        return await this.photoRepository.save(photo);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let photo = await this.photoRepository.findOne({id: request.params.id});
        
        await this.photoMetadataRepo
            .createQueryBuilder()
            .delete()
            .from(PhotoMetadata)
            .where("photoId = :id", {id: request.params.id})
            .execute();
        
        await this.photoRepository
            .createQueryBuilder()
            .delete()
            .from(Photo)
            .where("id = :id", {id: request.params.id})
            .execute();

        return photo;
    }
}
