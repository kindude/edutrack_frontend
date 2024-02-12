import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios_init";
import User from "../types/User";
import { Link } from "react-router-dom";
import Module from "../types/Module";
import ModuleUsers from "../types/ModuleUsers";

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [modules, setModules] = useState<ModuleUsers[]>([]);

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
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to Admin Page</h1>
            <div className="space-y-6">
                <div className="space-x-4 inline-block">
                    <Link to='/admin/new-module' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
                        Add Module
                    </Link>
                    <Link to='/admin/enroll-user' className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
                        Enroll User
                    </Link>
                </div>
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-2">User List</h2>
                    <ul className="border border-gray-300 divide-y divide-gray-300">
                        {users.map((user) => (
                            <li key={user.id} className="py-3 px-4 flex items-center justify-between">
                                <span className="text-lg font-bold">{user.first_name}</span>
                                <span className="text-gray-500">{user.email}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-2">Module List</h2>
                    <ul className="border border-gray-300 divide-y divide-gray-300">
                        {modules.map((module) => (
                            <li key={module.module.id} className="py-3 px-4 flex items-center justify-between">
                                <span className="text-lg font-bold">
                                    <Link to={`/modules/${module.module.id}`}>{module.module.title}</Link>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
