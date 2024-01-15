import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  performanceData: any[]; 
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ performanceData }) => {
    const filteredData = performanceData
      .filter((entry) => entry.day.mark !== null)
      .map((entry) => ({
        date: new Date(entry.day.date).toLocaleDateString(),
        mark: entry.day.mark || 0,
      }));
  
    return (
      <div>
        <h2>Students Performance Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mark" stroke="rgba(75,192,192,1)" strokeWidth={2} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default PerformanceChart;
  
