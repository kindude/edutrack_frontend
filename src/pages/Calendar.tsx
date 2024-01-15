import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosInstance from '../apis/axios_init';
import User from '../types/User';

interface MarkingCalendarProps {
  module_id?: string;
}

const MarkingCalendar: React.FC<MarkingCalendarProps> = ({ module_id }) => {
  const [date, setDate] = useState<Date | Date[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [mark, setMark] = useState<string | null>(null);
  const [presense, setPresense] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const response = await axiosInstance.get(`/actions/module/${module_id}/users`);
        setUsers(response.data.users);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsersInfo();
  }, []);
  const handleDateChange = (value: Date | Date[] | null) => {
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };

  const handleMarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMark(e.target.value);
  };


  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  const handlePresenseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
  
    const presenseValue: boolean = selectedValue === 'true';
  
    setPresense(presenseValue);
  };

  const handleSetMark = async () => {
    const requestData = {
      presence: presense,
      date: date,
      user_id: selectedUser,
      ...(mark !== 'null' && { mark: mark }), // Include mark only if it's not null
      module_id: module_id
    };
  
    const response = await axiosInstance.post('/actions/mark', requestData);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Editable Calendar</h1>
      <div className="flex items-center space-x-4">
        <Calendar
          onChange={handleDateChange as any}
          value={date as any}
          className="border border-gray-300 rounded p-2 shadow-md"
        />
        <div className="flex flex-col">
          <select
            value={selectedUser}
            onChange={handleUserChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter mark"
            onChange={handleMarkChange}
            className="mt-4 border border-gray-300 rounded p-2"
          />
          <select
            value={presense ? 'true' : 'false'}
            onChange={handlePresenseChange}
            className="border border-gray-300 rounded p-2 mt-2"
          >
            <option value="">Present/Absent</option>
            <option value="true">Present</option>
            <option value="false">Absent</option>
          </select>

          <button onClick={handleSetMark} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">
            Set Mark
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkingCalendar;