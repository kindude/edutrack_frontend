import Module from "./Module";
import User from "./User";

interface ModuleUsers {
    module: Module
    users: [User]
}

export default ModuleUsers;