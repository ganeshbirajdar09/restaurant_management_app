"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminData = exports.roleData = exports.ROLES = void 0;
exports.ROLES = {
    ADMIN: '1',
    OWNER: '2'
};
exports.roleData = [{ _id: exports.ROLES.ADMIN, name: "admin" }, { _id: exports.ROLES.OWNER, name: "owner" }];
exports.adminData = [
    {
        name: "admin",
        email: "admin@admin.com",
        password: "admin123",
        role: exports.ROLES.ADMIN
    }
];
//# sourceMappingURL=constants.js.map