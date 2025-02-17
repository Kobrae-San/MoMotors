export interface User {
  id?: number;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  updated_at?: Date;
  created_at?: Date;
}
