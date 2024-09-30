const users = {
    client: {
        id: 0,
        permissions: {
            adminpage: {
                canRead: 0,
                canWrite: 0,
                canUpdate: 0,
                canRemove: 0
            }
        }
    },
    suporte: {
        id: 1,
        permissions: {
            adminpage: {
                canRead: 1,
                canWrite: 1,
                canUpdate: 1,
                canRemove: 1
            }
        }
    },
    desenvolvedor: {
        id: 2,
        permissions: {
            adminpage: {
                canRead: 1,
                canWrite: 1,
                canUpdate: 1,
                canRemove: 1
            }
        }
    },
    admin: {
        id: 3,
        permissions: {
            adminpage: {
                canRead: 1,
                canWrite: 1,
                canUpdate: 1,
                canRemove: 1
            }
        }
    }
}

export {
    users
}