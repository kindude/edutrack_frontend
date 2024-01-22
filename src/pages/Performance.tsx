import React, { useEffect, useState } from "react";
import axiosInstance from "../apis/axios_init";
import PerformanceChart from "../components/PerformanceChart";
import Role from "../utils/isAdmin";
import PerformanceTable from "../components/PerformanceTable";

const Performance: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [chart, setChart] = useState<boolean>(false);
  const [table, setTable] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        let id = localStorage.getItem('id');
        if (id && typeof id === 'string') {
          id = id.replace(/"/g, '');
          const response = await axiosInstance.get(`/actions/user/${id}/marks`);
          setPerformanceData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        setError('Failed to fetch performance data.');
      }
    };

    const fetchAllMarks = async () => {
      try {
        const response = await axiosInstance.get(`/actions/users/marks`);
        setPerformanceData(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Failed to fetch performance data.');
      }
    };

    if (Role() === 'TEACHER') {
      // fetchAllMarks();
    }
    if (Role() === 'STUDENT') {
      setText("Student's performance");
      fetchMarks();
    }
  }, []);

  const setVisibleChart = () => {
    setChart(true);
    setTable(false);
  };

  const setVisibleTable = () => {
    setTable(true);
    setChart(false);
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-2xl font-semibold mb-4">{text}</h1>

      <div className="flex space-x-4">
        <button
          onClick={setVisibleChart}
          className={`px-4 py-2 ${
            chart ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          } rounded focus:outline-none focus:shadow-outline`}
        >
          Chart
        </button>
        <button
          onClick={setVisibleTable}
          className={`px-4 py-2 ${
            table ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          } rounded focus:outline-none focus:shadow-outline`}
        >
          Table
        </button>
      </div>

      {chart && <PerformanceChart performanceData={performanceData} />}
      {table && <PerformanceTable performanceData={performanceData} />}
    </div>
  );
};

export default Performance;
