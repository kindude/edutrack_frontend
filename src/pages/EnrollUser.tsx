import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios_init";
import User from "../types/User";
import Module from "../types/Module";
import { Roles } from "../utils/Roles";
import ModuleUsers from "../types/ModuleUsers";
import SuccessAlert from "../components/SuccessAlert";

const EnrollUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [modules, setModules] = useState<ModuleUsers[]>([]);
    const [selectedModule, setSelectedModule] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [error, setError] = useState<string>('');


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
        setAlertOpen(true);
        setTimeout(() => {
            setAlertOpen(false);
        }, 3000);
        setError('');
    };

    return (
        <div>
            {isAlertOpen && (
                <SuccessAlert
                    message="The user has been enrolled successfully"
                    onClose={() => setAlertOpen(false)}
                />
            )}
            <form onSubmit={handleEnroll} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="mb-4">
                    <select
                        value={selectedUser}
                        onChange={handleUserChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.first_name} {user.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <select
                        value={selectedModule}
                        onChange={handleModuleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">Select Module</option>
                        {modules.map(entity => (
                            <option key={entity.module.id} value={entity.module.id}>
                                {entity.module.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <select
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">Select Role</option>
                        {rolesArray.map(role => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Enroll User
                </button>
            </form>
        </div>

    );
};

export default EnrollUser;
