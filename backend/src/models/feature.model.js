import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
    {
        featureKey: {
            type: String,
            required: [true, "Feature key is required"],
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        enabled: {
            type: Boolean,
            default: false,
        },

        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

featureSchema.index(
    {
        organization: 1,
        featureKey: 1,
    },
    {
        unique: true,
    }
);

export const Feature = mongoose.model("Feature", featureSchema);
