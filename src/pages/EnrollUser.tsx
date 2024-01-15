import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios_init";
import User from "../types/User";
import Module from "../types/Module";
import { Roles } from "../utils/Roles";

const EnrollUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [modules, setModules] = useState<Module[]>([]);
    const [selectedModule, setSelectedModule] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');

    useEffect(() => {
        const fetchUsersInfo = async () => {
            try {
                const response = await axiosInstance.get('/users/');
                setUsers(response.data.users);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchModulesInfo = async () => {
            try {
                const response = await axiosInstance.get('/modules/all');
                setModules(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsersInfo();
        fetchModulesInfo();
    }, []);

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(e.target.value);
    };

    const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModule(e.target.value);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value);
    };

    const rolesArray: Array<Roles[keyof Roles]> = ['ADMIN', 'TEACHER', 'STUDENT', 'MODERATOR'];

    const handleEnroll = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestData = {
            module_id: selectedModule,
            user_id: selectedUser,
            role: selectedRole
        }

        const response = await axiosInstance.post('/actions/add', requestData);
    };

    return (
        <div>
            <form onSubmit={handleEnroll}>
                <select
                    value={selectedUser}
                    onChange={handleUserChange}
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.first_name} {user.last_name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedModule}
                    onChange={handleModuleChange}
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="">Select Module</option>
                    {modules.map(module => (
                        <option key={module.id} value={module.id}>
                            {module.title}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="">Select Role</option>
                    {rolesArray.map(role => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>

                <button type="submit" className="btn btn-primary">
                    Enroll User
                </button>
            </form>
        </div>
    );
};

export default EnrollUser;
