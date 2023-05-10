export const ROLES = {
    ADMIN: '1',
    OWNER: '2'
}


export const roleData = [{ _id: ROLES.ADMIN, name: "admin" }, { _id: ROLES.OWNER, name: "owner" }]

export const adminData = [
    {
        name: "admin",
        email: "admin@admin.com",
        password: "admin123",
        role: ROLES.ADMIN
    }
]