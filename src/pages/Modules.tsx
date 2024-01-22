import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import axiosInstance from "../apis/axios_init";
import Module from "../types/Module";
import { Link } from "react-router-dom";
import ModuleUsers from "../types/ModuleUsers";


const Modules: React.FC = () => {
    const [modules, setModules] = useState<ModuleUsers[]>([]);
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
      <div className="container mx-auto p-8">
        {error && <p className="text-red-500">{error}</p>}
        <h1 className="text-4xl font-bold mb-6">My Modules</h1>
        {modules.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Lecturers</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((entity, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <Link to={`/modules/${entity.module.id}`}>{entity.module.title}</Link>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {entity.users.length > 0 ? (
                      <ul>
                        {entity.users.map((user, idx) => (
                          <li key={idx}>
                            {user.first_name} {user.last_name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No lecturers available</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No modules available</p>
        )}
      </div>
    );
  };
  
  export default Modules;