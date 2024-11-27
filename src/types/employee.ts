export interface Employee {
  _id?: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: 'male' | 'female' | 'other';
  course: string;
  createdAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}