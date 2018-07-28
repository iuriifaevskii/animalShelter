import {UserController} from "../controller/UserController";

const userRoute = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "patch",
    route: "/users",
    controller: UserController,
    action: "edit"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}];

export default userRoute;