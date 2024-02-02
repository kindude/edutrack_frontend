import React, { useState } from 'react';
import { UserMarks } from '../types/UserMarks';
import Role from '../utils/isAdmin';
import { DayInfo } from '../types/DayInfo';
import * as XLSX from 'xlsx';

const PerformanceTable: React.FC<{ performanceData: UserMarks[] }> = ({ performanceData }) => {
  const [filters, setFilters] = useState({
    date: '',
    moduleTitle: '',
    presence: '',
    mark: '',
    userName: '',
  });

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  const filteredData = performanceData
    .map((data: UserMarks) => {
      const { days, first_name, last_name } = data;

      const filteredDays = days.filter((day: DayInfo) => {
        const formattedDate = new Date(day.date).toLocaleDateString();
        const moduleTitle = day.module_title;
        const presence = day.presence ? 'Present' : 'Absent';
        const mark = typeof day.mark === 'number' ? day.mark : '';

        const isDateMatch = filters.date === '' || formattedDate.includes(filters.date);
        const isModuleTitleMatch = filters.moduleTitle === '' || moduleTitle.includes(filters.moduleTitle);
        const isPresenceMatch = filters.presence === '' || presence.includes(filters.presence);
        const isMarkMatch = filters.mark === '' || mark.toString().includes(filters.mark);
        const isUserNameMatch =
          filters.userName === '' || (`${first_name} ${last_name}`.toLowerCase().includes(filters.userName.toLowerCase()));

        return isDateMatch && isModuleTitleMatch && isPresenceMatch && isMarkMatch && isUserNameMatch;
      });

      return { ...data, days: filteredDays };
    })
    .filter((data: UserMarks) => data.days.length > 0);

  const downloadCSV = () => {
    const csvData = filteredData.map((data: UserMarks) => {
      const { days, first_name, last_name } = data;
      const day = days[0];
      return {
        Date: new Date(day.date).toLocaleDateString(),
        'Module Title': day.module_title,
        Presence: day.presence ? 'Present' : 'Absent',
        Mark: typeof day.mark === 'number' ? day.mark : '',
        'User Name': `${first_name} ${last_name}`,
      };
    });

    const csvHeaders = [
      { label: 'Date', key: 'Date' },
      { label: 'Module Title', key: 'Module Title' },
      { label: 'Presence', key: 'Presence' },
      { label: 'Mark', key: 'Mark' },
      { label: 'User Name', key: 'User Name' },
    ];

    const csvFileName = 'performance_data.csv';
    const csvOptions = { headers: csvHeaders };

    return { data: csvData, headers: csvHeaders, filename: csvFileName, options: csvOptions };
  };

  const downloadXLSX = () => {
    const xlsxData = filteredData.flatMap((data: UserMarks) => {
      return data.days.map((day: any) => {
        const { first_name, last_name } = data;
        return {
          Date: new Date(day.date).toLocaleDateString(),
          'Module Title': day.module_title,
          Presence: day.presence ? 'Present' : 'Absent',
          Mark: typeof day.mark === 'number' ? day.mark : '',
          'User Name': `${first_name} ${last_name}`,
        };
      });
    });

    const xlsxFileName = 'performance_data.xlsx';

    const ws = XLSX.utils.json_to_sheet(xlsxData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Performance Data');
    XLSX.writeFile(wb, xlsxFileName);
  };

  const TableCell: React.FC<{ value: string | number }> = ({ value }) => (
    <td className="py-2 px-4 border-b">{value !== null && value !== undefined ? value.toString() : '-'}</td>
  );

  return (
    <div className="overflow-x-auto">
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

        {(Role() === 'ADMIN' || Role() === 'TEACHER') && (
          <>
            <label className="ml-4 mr-2">User Name:</label>
            <input type="text" value={filters.userName} onChange={(e) => handleFilterChange('userName', e.target.value)} />
          </>
        )}
      </div>

      <div className="mt-4">
        {/* Buttons to trigger download */}
        <button className="bg-green-500 text-white py-2 px-4" onClick={downloadXLSX}>
          Download XLSX
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        {/* Table header */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Module Title</th>
            <th className="py-2 px-4 border-b">Presence</th>
            <th className="py-2 px-4 border-b">Mark</th>
            {/* Display "User Name" column only for admins or teachers */}
            {(Role() === 'ADMIN' || Role() === 'TEACHER') && <th className="py-2 px-4 border-b">User Name</th>}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {filteredData.map((data: UserMarks, index: number) => {
            const { days, first_name, last_name } = data;

            return days.map((day: any, dayIndex: number) => {
              const formattedDate = new Date(day.date).toLocaleDateString();
              const moduleTitle = day.module_title;

              return (
                <tr key={`${index}-${dayIndex}`} className={(index + dayIndex) % 2 === 0 ? 'bg-gray-100' : ''}>
                  <TableCell value={formattedDate} />
                  <TableCell value={moduleTitle} />
                  <TableCell value={day.presence ? 'Present' : 'Absent'} />
                  <TableCell value={typeof day.mark === 'number' ? day.mark : ''} />
                  {(Role() === 'ADMIN' || Role() === 'TEACHER') && (
                    <TableCell value={`${first_name} ${last_name}`} />
                  )}
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceTable;
