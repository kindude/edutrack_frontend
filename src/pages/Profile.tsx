import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../apis/axios_init';

const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<any>({});
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get('users/me');
                setUserInfo(response.data);
            } catch (error) {
                setError('Failed to fetch user information.');
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <h1>User Information</h1>
            <div>
                <p>Name: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
                {/* Display other information as needed */}
            </div>
        </div>
    );
};

export default Profile;
