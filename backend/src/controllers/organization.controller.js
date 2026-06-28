import { Organization } from "../models/organization.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const createOrganization = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name?.trim()) {
        throw new ApiError(400, "Organization name is required");
    }

    const organizationExists = await Organization.findOne({
        name: name.trim(),
    });

    if (organizationExists) {
        throw new ApiError(409, "Organization already exists");
    }

    const organization = await Organization.create({
        name: name.trim(),
        description: description?.trim() || "",
    });

    if (!organization) {
        throw new ApiError(500, "Failed to create Organization !");
    }

    const organizationId = organization?._id;

    const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        {
            $addToSet: {
                organization: organizationId,
            },
        },
        {
            new: true,
        }
    );

    if (!updatedUser) {
        await Organization.findByIdAndDelete(organization?._id);

        throw new ApiError(500, "Failed to update User");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                organization,
                "Organization created successfully"
            )
        );
});

const getOrganizations = asyncHandler(async (req, res) => {
    const organizations = await Organization.find().sort({
        createdAt: -1,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                organizations,
                "Organizations fetched successfully"
            )
        );
});

const getOrganizationById = asyncHandler(async (req, res) => {
    const { organizationId } = req?.params;

    const organization = await Organization.findById(organizationId);

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                organization,
                "Organization fetched successfully"
            )
        );
});

const updateOrganization = asyncHandler(async (req, res) => {
    const { organizationId } = req.params;
    const { name, description, isActive } = req.body;

    const organization = await Organization.findById(organizationId);

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    if (name?.trim()) {
        const duplicate = await Organization.findOne({
            name: name.trim(),
            _id: { $ne: organizationId },
        });

        if (duplicate) {
            throw new ApiError(409, "Organization name already exists");
        }

        organization.name = name.trim();
    }

    if (description !== undefined) {
        organization.description = description;
    }

    if (typeof isActive === "boolean") {
        organization.isActive = isActive;
    }

    await organization.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                organization,
                "Organization updated successfully"
            )
        );
});

const deleteOrganization = asyncHandler(async (req, res) => {
    const { organizationId } = req.params;

    const organization = await Organization.findById(organizationId);

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    await organization.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Organization deleted successfully"));
});

const getOrganizationsByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId)
        .select("-password -refreshToken")
        .populate("organization");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user?.organization || [],
                "Organizations fetched successfully"
            )
        );
});

export {
    createOrganization,
    getOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
    getOrganizationsByUser,
};
