class CustomError extends Error {
    public redirectToLogin: boolean;
  
    constructor(message: string) {
      super(message);
      this.redirectToLogin = false;
    }
  }

  export default CustomError;