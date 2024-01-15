const Role = (): String => {
    const userString = localStorage.getItem('role');
  
    if (userString) {
      const user = JSON.parse(userString);
      if (user) {
        return String(user);
      }
    }
    return '';
  
  };
  
  export default Role;