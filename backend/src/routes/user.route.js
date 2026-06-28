import { Router } from "express";
import {
    registerUser,
    userLogin,
    userLogout,
    newAccessTokenRequest,
} from "../controllers/user.controller.js";
import { authHandler } from "../middlewires/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.put("/new-access-token", newAccessTokenRequest);

userRouter.post("/logout", authHandler, userLogout);

export { userRouter };
