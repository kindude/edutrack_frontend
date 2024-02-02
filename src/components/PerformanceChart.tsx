import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserMarks } from '../types/UserMarks';

interface PerformanceChartProps {
  performanceData: UserMarks[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ performanceData }) => {
  const [chartMode, setChartMode] = useState<'module' | 'overall'>('overall');

  const filteredData = performanceData
  .filter((entry) => entry.days.some((day) => day.mark !== null))
  .flatMap((entry) => {
    return entry.days.map((day) => ({
      date: new Date(day.date).toLocaleDateString(),
      mark: day.mark || 0,
      moduleTitle: day.module_title || '',
    }));
  });

  const chartData: Record<string, any[]> = chartMode === 'module'
  ? filteredData.reduce((acc: Record<string, any[]>, entry) => {
      const moduleTitle = entry.moduleTitle as string;
      const date = entry.date as string;

      if (!acc[moduleTitle]) {
        acc[moduleTitle] = [];
      }

      acc[moduleTitle].push({ date, mark: entry.mark });
      return acc;
    }, {})
  : { overall: filteredData.reduce((acc: { date: string; mark: number }[], entry) => {
      const date = entry.date as string;

      if (!acc.some((item) => item.date === date)) {
        acc.push({ date, mark: entry.mark });
      }

      return acc;
    }, []) };

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
            : <Line type="monotone" dataKey="mark" data={Object.values(chartData)} stroke="rgba(75,192,192,1)" strokeWidth={2} dot={{ r: 5 }} />
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;