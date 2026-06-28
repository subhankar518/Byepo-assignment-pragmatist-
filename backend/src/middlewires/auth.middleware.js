import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";

const authHandler = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    // console.log("----", token);

    if (!token) {
        throw new ApiError(400, "Token not found");
    }

    const decodedToken = await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

    if (!decodedToken) {
        throw new ApiError(401, "Unauthorized Access");
    }

    req.userId = decodedToken?.id;
    next();
});

export { authHandler };
