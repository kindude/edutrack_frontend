import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosInstance from '../apis/axios_init';
import User from '../types/User';
import SuccessAlert from '../components/SuccessAlert';

interface MarkingCalendarProps {
  module_id?: string;
}

const MarkingCalendar: React.FC<MarkingCalendarProps> = ({ module_id }) => {
  const [date, setDate] = useState<Date | Date[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [mark, setMark] = useState<string | null>(null);
  const [typeOfMark, setTypeOfMark] = useState<string>(''); // New state for type of mark
  let [presense, setPresense] = useState<string>('');
  const [isAlertOpen, setAlertOpen] = useState(false);

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
    setPresense(selectedValue);
  };

  const handleTypeOfMarkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeOfMark(e.target.value);
  };

  const handleSetMark = async () => {
    if (mark !== 'null') {
      setPresense('PRESENT');
    }
    const requestData = {
      presence: presense,
      date: date,
      user_id: selectedUser,
      mark: mark,
      type_of_mark: typeOfMark,
      module_id: module_id
    };
    try {
      const response = await axiosInstance.post('/actions/mark', requestData);
      setAlertOpen(true);

      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
      setError('');

    } catch (error) {
      setError('A problem occured when setting a mark');
      console.log(error);
    };
  };

  return (
    <div className="container mx-auto p-8">
      {isAlertOpen && (
        <SuccessAlert
          message="Mark has been submitted successfully"
          onClose={() => setAlertOpen(false)}
        />
      )}
      <h1 className="text-3xl font-bold mb-6">Editable Calendar</h1>
      <div className="flex flex-col">
        {error && <p className='text-red-400'>{error}</p>}
        <Calendar
          onChange={handleDateChange as any}
          value={date as any}
          className="border border-gray-300 rounded p-2 shadow-md"
        />
        <div className="flex flex-col">
          <select
            value={selectedUser}
            onChange={handleUserChange}
            className="border border-gray-300 rounded p-2 mt-2 md:mt-0"
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
            value={typeOfMark}
            onChange={handleTypeOfMarkChange}
            className="border border-gray-300 rounded p-2 mt-2 md:mt-0"
          >
            <option value="">Select Type Of Mark</option>
            <option value={'LABMARK'}>
              Lab work
            </option>
            <option value={'COURSEWORK'}>
              Coursework
            </option>
          </select>

          <select
            value={presense} // Here, use the actual value ('PRESENT' or 'ABSENT')
            onChange={handlePresenseChange}
            className="border border-gray-300 rounded p-2 mt-2"
          >
            <option value="">Present/Absent</option>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>

          <button onClick={handleSetMark} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Set Mark
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkingCalendar;
