import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required !"],
            trim: true,
            unique: true,
            index: true,
        },
        description: {
            type: String,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const Organization = mongoose.model("Organization", organizationSchema);
