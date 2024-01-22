import React, { useState } from 'react';

const PerformanceTable: React.FC<any> = ({ performanceData }) => {
  const [filters, setFilters] = useState({
    date: '',
    moduleTitle: '',
    presence: '',
    mark: '',
  });

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  const filteredData = performanceData.filter((data: any) => {
    // Implement filtering logic based on the applied filters
    return (
      data.day.date.includes(filters.date) &&
      data.module.title.includes(filters.moduleTitle) &&
      (filters.presence === '' || (data.day.presence && filters.presence === 'Present') || (!data.day.presence && filters.presence === 'Absent')) &&
      (filters.mark === '' || (data.day.mark !== null && data.day.mark !== undefined && data.day.mark.toString().includes(filters.mark)))
    );
  });

  return (
    <div className="overflow-x-auto">
      {/* Add filter inputs above the table */}
      <div className="mt-4">
        <label className="mr-2">Date:</label>
        <input type="text" value={filters.date} onChange={(e) => handleFilterChange('date', e.target.value)} />

        <label className="ml-4 mr-2">Module Title:</label>
        <input type="text" value={filters.moduleTitle} onChange={(e) => handleFilterChange('moduleTitle', e.target.value)} />

        <label className="ml-4 mr-2">Presence:</label>
        <select value={filters.presence} onChange={(e) => handleFilterChange('presence', e.target.value)}>
          <option value="">All</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <label className="ml-4 mr-2">Mark:</label>
        <input type="text" value={filters.mark} onChange={(e) => handleFilterChange('mark', e.target.value)} />
      </div>

      {/* Render the table below the filter inputs */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Module Title</th>
            <th className="py-2 px-4 border-b">Presence</th>
            <th className="py-2 px-4 border-b">Mark</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data: { day: { id: string; date: string; presence: boolean; mark: any }; module: { title: string }; }, index: number) => {
            const formattedDate = new Date(data.day.date).toLocaleDateString();

            return (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border-b">{formattedDate}</td>
                <td className="py-2 px-4 border-b">{data.module.title}</td>
                <td className="py-2 px-4 border-b">{data.day.presence ? 'Present' : 'Absent'}</td>
                <td className="py-2 px-4 border-b">
                  {data.day.mark !== null && data.day.mark !== undefined ? data.day.mark.toString() : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceTable;
