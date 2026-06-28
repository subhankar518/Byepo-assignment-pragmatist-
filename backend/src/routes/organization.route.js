import { Router } from "express";
import {
    createOrganization,
    getOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
    getOrganizationsByUser,
} from "../controllers/organization.controller.js";
import { authHandler } from "../middlewires/auth.middleware.js";
import { authorizeRoles } from "../middlewires/roles.middleware.js";

const organizationRouter = Router();

organizationRouter.post(
    "/create-organization",
    authHandler,
    authorizeRoles("SUPER-ADMIN"),
    createOrganization
);

organizationRouter.get(
    "/get-all-organizations",
    authHandler,
    //authorizeRoles("SUPER-ADMIN", "ADMIN", "USER"),
    getOrganizations
);

organizationRouter.get(
    "/get-organization-details/:organizationId",
    authHandler,
    //authorizeRoles("SUPER-ADMIN", "ADMIN", "USER"),
    getOrganizationById
);

organizationRouter.delete(
    "/delete-organization/:organizationId",
    authHandler,
    authorizeRoles("SUPER-ADMIN"),
    deleteOrganization
);

// Extra Functionality

// organizationRouter.put(
//     "/update-organization/:organizationId",
//     authHandler,
//     authorizeRoles("SUPER-ADMIN"),
//     updateOrganization
// );

// organizationRouter.get(
//     "/get-user-organizations/:userId",
//     authHandler,
//     authorizeRoles("SUPER-ADMIN"),
//     getOrganizationsByUser
// );

export { organizationRouter };
