export interface AuthenticatedUser {
  user: any;
  id: string;
  username?: string;
  email?: string;
  roles: string[];
}
