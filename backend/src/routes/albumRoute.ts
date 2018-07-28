import {AlbumController} from "../controller/AlbumController";

const albumRoute = [{
    method: "get",
    route: "/albums",
    controller: AlbumController,
    action: "all"
}, {
    method: "get",
    route: "/albums/:id",
    controller: AlbumController,
    action: "one"
}, {
    method: "post",
    route: "/albums",
    controller: AlbumController,
    action: "save"
}, {
    method: "patch",
    route: "/albums",
    controller: AlbumController,
    action: "edit"
}, {
    method: "delete",
    route: "/albums/:id",
    controller: AlbumController,
    action: "remove"
}];

export default albumRoute;