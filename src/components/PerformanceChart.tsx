import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  performanceData: any[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ performanceData }) => {
  const [chartMode, setChartMode] = useState<'module' | 'overall'>('overall');

  const filteredData = performanceData
    .filter((entry) => entry.day.mark !== null)
    .map((entry) => {
      if (chartMode === 'module') {
        // Filter by module title
        return {
          date: new Date(entry.day.date).toLocaleDateString(),
          mark: entry.day.mark || 0,
          moduleTitle: entry.module.title,
        };
      } else {
        // Calculate overall progress
        return {
          date: new Date(entry.day.date).toLocaleDateString(),
          mark: entry.day.mark || 0,
        };
      }
    });

  // Set up chart data based on the chart mode
  const chartData = chartMode === 'module'
    ? filteredData.reduce((acc: any, entry: any) => {
        if (!acc[entry.moduleTitle]) {
          acc[entry.moduleTitle] = [];
        }
        acc[entry.moduleTitle].push(entry);
        return acc;
      }, {})
    : filteredData;

  const handleChartModeChange = (mode: 'module' | 'overall') => {
    setChartMode(mode);
  };

  return (
    <div>
      <div>
        <label htmlFor="chartModeSelect">Select Chart Mode: </label>
        <select
          id="chartModeSelect"
          value={chartMode}
          onChange={(e) => handleChartModeChange(e.target.value as 'module' | 'overall')}
        >
          <option value="overall">Overall</option>
          <option value="module">By Module</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartMode === 'module'
            ? Object.keys(chartData).map((moduleTitle, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey="mark"
                  data={chartData[moduleTitle]}
                  name={moduleTitle}
                  stroke={`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`}
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              ))
            : <Line type="monotone" dataKey="mark" data={chartData} stroke="rgba(75,192,192,1)" strokeWidth={2} dot={{ r: 5 }} />
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
