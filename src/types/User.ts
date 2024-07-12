interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    };
  }