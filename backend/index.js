import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./src/db/connectDb.js";

const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan()); // api log

const PORT = process.env.PORT || 8001;

connectDB().then(() => {
    app.on("error", (error) => {
        console.log("ERROR ", error);
    });
    app.listen(PORT, () => {
        console.log("Server is running on : ", PORT);
    });
});

import { userRouter } from "./src/routes/user.route.js";
import { organizationRouter } from "./src/routes/organization.route.js";
import { featureRouter } from "./src/routes/feature.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/organizations", organizationRouter);
app.use("/api/v1/features", featureRouter);
