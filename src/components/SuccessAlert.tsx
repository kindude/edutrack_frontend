import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

interface SuccessAlertProps {
  message: string;
  onClose: () => void;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 3000); 

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessAlert;
