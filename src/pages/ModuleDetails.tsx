import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../apis/axios_init";
import { AxiosError } from "axios";
import User from "../types/User";
import ModuleUsers from "../types/ModuleUsers";
import MarkingCalendar from "./Calendar";
import Role from "../utils/isAdmin";

const ModuleDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Assuming the ID is passed as a parameter in the URL

    const [moduleUsers, setModuleUsers] = useState<ModuleUsers>();
    const [error, setError] = useState<string>('');
    
    useEffect(() => {
        console.log("ID:", id);
        const fetchUsersInfo = async () => {
          try {
            const response = await axiosInstance.get(`/actions/module/${id}/users`);
            setModuleUsers(response.data);
          } catch (error) { 
            setError('Failed to fetch user information.');
          }
        };
    
        fetchUsersInfo();
      }, [id]);

    return (<div>

    <h1>{moduleUsers?.module.title}</h1>
    {Role() == 'TEACHER' &&(
      <MarkingCalendar module_id={id}></MarkingCalendar>
    )
    }
    
   
    </div>)  

}

export default ModuleDetails;