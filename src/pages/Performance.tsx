import { useEffect, useState } from "react";
import Day from "../types/Day";
import axiosInstance from "../apis/axios_init";
import PerformanceChart from "../components/PerformanceChart";
import Role from "../utils/isAdmin";


const Performance: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    const fetchMarks = async () => {
      try {
        let id = localStorage.getItem('id');
        if (id && typeof id === 'string') {
          id = id.replace(/"/g, ''); // This will remove all double quotes from the string
          const response = await axiosInstance.get(`/actions/user/${id}/marks`);
          setPerformanceData(response.data);
        }
      } catch (error) {
        setError('Failed to fetch performance data.');
      }
    };
    const fetchAllMarks = async () => {
      try {
          const response = await axiosInstance.get(`/actions/users/marks`);
          setPerformanceData(response.data);
        }
       catch (error) {
        setError('Failed to fetch performance data.');
      }
    };
    
    if (Role() == 'TEACHER'){
      fetchAllMarks();
    }
    if(Role() == 'STUDENT'){

    fetchMarks();
    }
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <PerformanceChart performanceData={performanceData} />
    </div>
  );
};

export default Performance;
