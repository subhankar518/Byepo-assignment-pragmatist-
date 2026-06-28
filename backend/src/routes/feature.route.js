import { Router } from "express";
import { authHandler } from "../middlewires/auth.middleware.js";
import { authorizeRoles } from "../middlewires/roles.middleware.js";
import {
    createFeature,
    getAllFeatures,
    getFeatureById,
    updateFeature,
    toggleFeature,
    deleteFeature,
    getFeaturesByOrganization,
    checkFeatureStatus,
} from "../controllers/feature.controller.js";

const featureRouter = Router();

featureRouter.post(
    "/create-feature",
    authHandler,
    authorizeRoles("SUPER-ADMIN", "ADMIN"),
    createFeature
);

featureRouter.get("/get-all-features", authHandler, getAllFeatures);

featureRouter.get(
    "/get-feature-details/:featureId",
    authHandler,
    getFeatureById
);

featureRouter.put(
    "/update-feature/:featureId",
    authHandler,
    authorizeRoles("SUPER-ADMIN", "ADMIN"),
    updateFeature
);

featureRouter.patch("/toggle-feature/:featureId", authHandler, toggleFeature);

featureRouter.delete(
    "/delete-feature/:featureId",
    authHandler,
    authorizeRoles("SUPER-ADMIN", "ADMIN"),
    deleteFeature
);

featureRouter.get(
    "/get-features-by-organization/:organizationId",
    authHandler,
    getFeaturesByOrganization
);

featureRouter.get("/check-feature", authHandler, checkFeatureStatus);

export { featureRouter };
