import { Feature } from "../models/feature.model.js";
import { Organization } from "../models/organization.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createFeature = asyncHandler(async (req, res) => {
    const { featureKey, description, enabled, organization } = req.body;

    if (!featureKey?.trim()) {
        throw new ApiError(400, "Feature Key is required");
    }

    if (!organization) {
        throw new ApiError(400, "Organization is required");
    }

    const organizationExists = await Organization.findById(organization);

    if (!organizationExists) {
        throw new ApiError(404, "Organization not found");
    }

    const featureExists = await Feature.findOne({
        featureKey: featureKey.trim(),
        organization,
    });

    if (featureExists) {
        throw new ApiError(409, "Feature already exists");
    }

    const feature = await Feature.create({
        featureKey: featureKey.trim(),
        description: description?.trim() || "",
        enabled: enabled ?? false,
        organization,
        createdBy: req.userId,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, feature, "Feature created successfully"));
});

const getAllFeatures = asyncHandler(async (req, res) => {
    const features = await Feature.find().sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, features, "Features fetched successfully"));
});

const getFeatureById = asyncHandler(async (req, res) => {
    const { featureId } = req.params;

    const feature = await Feature.findById(featureId);

    if (!feature) {
        throw new ApiError(404, "Feature not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, feature, "Feature fetched successfully"));
});

const updateFeature = asyncHandler(async (req, res) => {
    const { featureId } = req.params;

    const { featureKey, description, enabled, organization } = req.body;

    const feature = await Feature.findById(featureId);

    // console.log("feature 1 :", feature1);

    if (!feature) {
        throw new ApiError(404, "Feature not found");
    }

    if (featureKey?.trim()) {
        const duplicate = await Feature.findOne({
            featureKey: featureKey.trim(),
            organization: organization || feature?.organization,
            _id: { $ne: featureId },
        });

        if (duplicate) {
            throw new ApiError(409, "Feature Key already exists");
        }

        feature.featureKey = featureKey.trim();
    }

    if (description !== undefined) {
        feature.description = description;
    }

    if (typeof enabled === "boolean") {
        feature.enabled = enabled;
    }

    if (organization) {
        const organizationExists = await Organization.findById(organization);

        if (!organizationExists) {
            throw new ApiError(404, "Organization not found");
        }

        feature.organization = organization;
    }

    // console.log("feature 2 : ", feature2);

    await feature.save();

    // console.log("feature 3 :", feature3);

    return res
        .status(200)
        .json(new ApiResponse(200, feature, "Feature updated successfully"));
});

const toggleFeature = asyncHandler(async (req, res) => {
    const { featureId } = req.params;

    const feature = await Feature.findById(featureId);

    if (!feature) {
        throw new ApiError(404, "Feature not found");
    }

    feature.enabled = !feature.enabled;

    await feature.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                feature,
                `Feature ${feature.enabled ? "enabled" : "disabled"} successfully`
            )
        );
});

const deleteFeature = asyncHandler(async (req, res) => {
    const { featureId } = req.params;

    const feature = await Feature.findById(featureId);

    if (!feature) {
        throw new ApiError(404, "Feature not found");
    }

    await feature.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Feature deleted successfully"));
});

const getFeaturesByOrganization = asyncHandler(async (req, res) => {
    const { organizationId } = req.params;

    const organization = await Organization.findById(organizationId);

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    const features = await Feature.find({
        organization: organizationId,
    }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, features, "Features fetched successfully"));
});

const checkFeatureStatus = asyncHandler(async (req, res) => {
    const { featureKey, organizationId } = req.query;

    if (!featureKey?.trim()) {
        throw new ApiError(400, "Feature Key is required");
    }

    if (!organizationId) {
        throw new ApiError(400, "Organization is required");
    }

    const feature = await Feature.findOne({
        featureKey: featureKey.trim(),
        organization: organizationId,
    });

    if (!feature) {
        throw new ApiError(404, "Feature not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, feature, "Feature fetched successfully"));
});

export {
    createFeature,
    getAllFeatures,
    getFeatureById,
    updateFeature,
    toggleFeature,
    deleteFeature,
    getFeaturesByOrganization,
    checkFeatureStatus,
};
