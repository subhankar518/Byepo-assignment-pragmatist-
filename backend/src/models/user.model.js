import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required !"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required !"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required !"],
        },

        phone: {
            type: Number,
            default: null,
        },

        refreshToken: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["SUPER-ADMIN", "ADMIN", "USER"],
            default: "USER",
        },

        organization: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Organization",
            },
        ],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
