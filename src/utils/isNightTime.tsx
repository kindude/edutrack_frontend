const isNightTime = (): Boolean => {
    const theme = localStorage.getItem('theme');
  
    if (theme) {
      
      if (theme == 'dark'){
        return true;
      }

    }
    return false;
  
  };
  
  export default isNightTime;