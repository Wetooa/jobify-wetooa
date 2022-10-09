"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = void 0;
const errors_1 = require("../errors");
const checkPermissions = (requestUser, resourceUserId) => {
    console.log(requestUser, resourceUserId);
    if (requestUser === resourceUserId.toString())
        return;
    throw new errors_1.UnauthenticatedError("No permission to access this route!");
};
exports.checkPermissions = checkPermissions;
