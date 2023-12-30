const isLoggedIn = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
};

export default isLoggedIn;