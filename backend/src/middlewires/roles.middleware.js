import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const authorizeRoles = (...roles) => {
    return asyncHandler(async (req, res, next) => {
        const user = await User.findById(req?.userId);

        if (!user) {
            throw new ApiError(401, "User not found !");
        }

        if (!roles.includes(user.role)) {
            throw new ApiError(
                403,
                "You are not allowed to perform this action"
            );
        }

        req.user = user;

        next();
    });
};

export { authorizeRoles };
