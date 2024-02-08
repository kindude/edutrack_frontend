import React from 'react';

interface ForbiddenProps {
  message: string;
}

const Forbidden: React.FC<ForbiddenProps> = ({ message }) => {
  return (
    <div className="bg-red-200 p-4 rounded-lg shadow-md">
      <p className="text-red-800 font-bold">{message}</p>
    </div>
  );
};

export default Forbidden;
