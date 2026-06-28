import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { passwordHash } from "../utils/passwordHash.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
} from "../utils/jwtToken.js";
import bcryptjs from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "Please provide required fields");
    }

    const availableUser = await User.findOne({ email });

    if (availableUser) {
        throw new ApiError(400, "Already registered email");
    }

    const hashedPassword = await passwordHash(password);

    const payload = {
        name,
        email,
        password: hashedPassword,
        phone,
        role,
    };

    const newUserWithPayload = new User(payload);
    const newUser = await newUserWithPayload.save();

    return res
        .status(201)
        .json(new ApiResponse(201, newUser, "User Registration Successfull"));
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Please provide email and password.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User not exist");
    }

    const checkPassword = await bcryptjs.compare(password, user?.password);

    if (!checkPassword) {
        throw new ApiError(400, "Please provide right email and password");
    }

    const accessToken = await generateAccessToken(user?._id);
    const refreshToken = await generateRefreshToken(user?._id);

    const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken, user: loggedInUser },
                "Login Successfully"
            )
        );
});

const userLogout = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await User.findByIdAndUpdate(userId, {
        refreshToken: "",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Logout Successful"));
});

const newAccessTokenRequest = asyncHandler(async (req, res) => {
    const refreshToken =
        req?.cookie?.refreshToken ||
        req?.header?.authorization?.split(" ")[1] ||
        req?.header("Authorization")?.replace("Bearer ", "");

    if (!refreshToken) {
        throw new ApiError(400, "Token not found");
    }

    const verify = await verifyToken(refreshToken);

    if (!verify) {
        throw new ApiError(401, "Token is expired !");
    }

    console.log(verify); // maybe id

    const userId = verify?._id;

    const newAccessToken = await generateAccessToken(userId);

    const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res
        .status(200)
        .json(new ApiResponse(200, { accessToken: newAccessToken }));
});

export { registerUser, userLogin, userLogout, newAccessTokenRequest };
