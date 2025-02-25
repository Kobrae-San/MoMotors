export default interface User {
  id?: number;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  username?: string;
  is_admin: boolean;
  updated_at?: Date;
  created_at?: Date;
}
