const first_name = (): string => {
    const firstName = localStorage.getItem('first_name');
    return firstName ? JSON.parse(firstName) : 'user';
}

export default first_name;
