export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'CLIENT_ADMIN' | 'CLIENT';
  clientId?: string;
  password?: string; // only for creation
  createdAt?: string;
  updatedAt?: string;
}

