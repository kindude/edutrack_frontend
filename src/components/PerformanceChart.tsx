import React, { useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserMarks } from '../types/UserMarks';
import { DayInfo } from '../types/DayInfo';
import html2canvas from 'html2canvas';

interface PerformanceChartProps {
  performanceData: UserMarks[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ performanceData }) => {
  const [chartMode, setChartMode] = useState<'overall' | 'module'>('overall');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null); // Reference to the chart container

  const handleChartModeChange = (mode: 'overall' | 'module') => {
    setChartMode(mode);
  };

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModule(e.target.value);
  };

  const handleSaveAsImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'chart.png';
        link.click();
      });
    }
  };

  const getModuleOptions = (): JSX.Element[] => {
    const moduleTitles: string[] = [];
    performanceData.forEach(user => {
      user.days.forEach((day: DayInfo) => {
        const moduleName = day.module_title;
        if (!moduleTitles.includes(moduleName)) {
          moduleTitles.push(moduleName);
        }
      });
    });
    return moduleTitles.map(moduleTitle => (
      <option key={moduleTitle} value={moduleTitle}>{moduleTitle}</option>
    ));
  };

  const getChartData = (): { name: string, data: { date: string, mark: number }[] }[] => {
    if (chartMode === 'overall') {
      // Filter by selected module if applicable
      let filteredData = performanceData.flatMap(user => user.days);
      if (selectedModule) {
        filteredData = filteredData.filter(day => day.module_title === selectedModule);
      }

      // Aggregate data
      const overallData: { date: string, mark: number }[] = [];
      filteredData.forEach((day: DayInfo) => {
        const date = new Date(day.date).toLocaleDateString();
        const existingData = overallData.find(data => data.date === date);
        if (existingData) {
          existingData.mark += day.mark;
        } else {
          overallData.push({ date, mark: day.mark });
        }
      });
      return [{ name: 'Overall', data: overallData }];
    } else {
      // Module-wise mode: separate data for each module
      const moduleData: { [moduleName: string]: { date: string, mark: number }[] } = {};
      performanceData.forEach(user => {
        user.days.forEach((day: DayInfo) => {
          const moduleName = day.module_title;
          const date = new Date(day.date).toLocaleDateString();
          if (!moduleData[moduleName]) {
            moduleData[moduleName] = [];
          }
          moduleData[moduleName].push({ date, mark: day.mark });
        });
      });

      // Filter by selected module if applicable
      const filteredModuleData = selectedModule ? moduleData[selectedModule] : [];
      return selectedModule ? [{ name: selectedModule, data: filteredModuleData }] : [];
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4 mt-4">
        <label htmlFor="chartModeSelect" className="text-gray-700">Select Chart Mode:</label>
        <select
          id="chartModeSelect"
          value={chartMode}
          onChange={(e) => handleChartModeChange(e.target.value as 'overall' | 'module')}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="overall">Overall</option>
          <option value="module">By Module</option>
        </select>
        {chartMode === 'module' && (
          <select
            value={selectedModule || ''}
            onChange={handleModuleChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select Module</option>
            {getModuleOptions()}
          </select>
        )}
        <button
          onClick={handleSaveAsImage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Save Chart as Image
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <div ref={chartRef}>
          <LineChart width={1200} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {getChartData().map((dataSet, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey="mark"
                data={dataSet.data}
                name={dataSet.name}
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
