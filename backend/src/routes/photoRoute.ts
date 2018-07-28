import {PhotoController} from "../controller/PhotoController";

const photoRoute = [{
    method: "get",
    route: "/photos",
    controller: PhotoController,
    action: "all"
}, {
    method: "get",
    route: "/photos/:id",
    controller: PhotoController,
    action: "one"
}, , {
    method: "post",
    route: "/photos",
    controller: PhotoController,
    action: "save"
}, {
    method: "delete",
    route: "/photos/:id",
    controller: PhotoController,
    action: "remove"
}];

export default photoRoute;