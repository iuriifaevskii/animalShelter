import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import {Photo} from "./entity/Photo";
import {PhotoMetadata} from './entity/PhotoMetadata';
import {Album} from "./entity/Album";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom2",
    //     lastName: "Assassin2",
    //     age: 88
    // }));
    //let photo = new Photo();
    //photo.name = "Me and Bears";
    //photo.description = "I am near polar bears";
    //photo.filename = "photo-with-bears.jpg";
    //photo.views = 3;
    //photo.isPublished = true;

    let photoRepository = connection.getRepository(Photo);
    
    //await photoRepository.save(photo);
    //console.log("Photo has been saved. Photo id is");
//
    //let savedPhotos = await photoRepository.find();
    //console.log('all photos from the bd: ', savedPhotos);
    //
    //let firstPhoto = await photoRepository.findOne(1);
    //console.log("First photo from the db: ", firstPhoto);
    //let meAndBearsPhoto = await photoRepository.findOne({ name: "Me and Bears" });
    //console.log("Me and Bears photo from the db: ", meAndBearsPhoto);
//
    //let allViewedPhotos = await photoRepository.find({ views: 1 });
    //console.log("All viewed photos: ", allViewedPhotos);
//
    //let allPublishedPhotos = await photoRepository.find({ isPublished: true });
    //console.log("All published photos: ", allPublishedPhotos);
//
    //let [allPhotos, photosCount] = await photoRepository.findAndCount();
    //console.log("All photos: ", allPhotos);
    //console.log("Photos count: ", photosCount);
//
    //// Now photo with id = 1 will be removed from the database.
    //let photoToRemove = await photoRepository.findOne(1);
    //await photoRepository.remove(photoToRemove);


//    // create a photo
//    let photo1 = new Photo();
//    photo1.name = "Me and Bears";
//    photo1.description = "I am near polar bears";
//    photo1.filename = "photo-with-bears.jpg";
//    photo1.views = 3;
//    photo1.isPublished = true;
//
//    await photoRepository.save(photo1);
//
//    // create a photo metadata
//    let metadata = new PhotoMetadata();
//    metadata.height = 640;
//    metadata.width = 480;
//    metadata.orientation = "portait";
//    metadata.compressed = true;
//    metadata.comment = "cybershoot";
//    metadata.photo = photo1; // this way we connect them
//
//    let metadataRepository = connection.getRepository(PhotoMetadata);
//    await metadataRepository.save(metadata);

    //let photos = await photoRepository.find({ relations: ["metadata"] });
//    let photos = await connection
//            .getRepository(Photo)
//            .createQueryBuilder("photo")
//            .innerJoinAndSelect("photo.metadata", "metadata")
//            .getMany();
//
//    console.log(photos);


    //// create photo object
    //let photo = new Photo();
    //photo.name = "Me and Bears";
    //photo.description = "I am near polar bears";
    //photo.filename = "photo-with-bears.jpg";
    //photo.isPublished = true;
    //photo.views = 3;
//
    //// create photo metadata object
    //let metadata = new PhotoMetadata();
    //metadata.height = 640;
    //metadata.width = 480;
    //metadata.compressed = true;
    //metadata.comment = "cybershoot";
    //metadata.orientation = "portait";
    //
    //photo.metadata = metadata; // this way we connect them
//
    //// saving a photo also save the metadata
    //await photoRepository.save(photo);


    let albomRepository = connection.getRepository(Album);

    let album1 = new Album();
    album1.name = 'album 01';
    
    await albomRepository.save(album1);

    let album2 = new Album();
    album2.name = 'album 02';

    await albomRepository.save(album2);

    let photo123 = new Photo();
    photo123.name = "Me and Bears";
    photo123.description = "I am near polar bears";
    photo123.filename = "photo-with-bears.jpg";
    photo123.views = 3;
    photo123.isPublished = true;
    photo123.albums = [album1, album2];

    await photoRepository.save(photo123);

    const loadedPhoto = await connection
        .getRepository(Photo)
        .findOne(1, { relations: ["albums"] });

    console.log(loadedPhoto)

    console.log("Photo is saved, photo metadata is saved too.")
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
}).catch(error => console.log(error));
