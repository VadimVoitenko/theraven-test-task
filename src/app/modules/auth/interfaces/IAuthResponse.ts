export interface IAuthResponse {
  first_name: string;
  last_name: string;
  role: 'Admin' | 'User';
  token: string;
}
