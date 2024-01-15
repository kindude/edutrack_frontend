import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import axiosInstance from "../apis/axios_init";
import Module from "../types/Module";
import { Link } from "react-router-dom";


const Modules: React.FC = () => {
    const [modules, setModules] = useState<Module[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await axiosInstance.get('/actions/user/modules');
                setModules(response.data);
            } catch (error) {
                setError('Failed to fetch modules information.');
            }
        };

        fetchModules();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <h1>All Modules</h1>
            {modules.length > 0 ? (
                <ul>
                    {modules.map((module, index) => (
                        <li key={index}>
                            <p>
                                Title:{' '}
                                <Link to={`/modules/${module.id}`}>{module.title}</Link>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No modules available</p>
            )}
        </div>
    );
};

export default Modules;