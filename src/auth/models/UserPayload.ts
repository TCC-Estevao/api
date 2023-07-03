export interface UserPayload {
  id?: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  spendingLimit?: number;
  iat?: number;
  exp?: number;
}
