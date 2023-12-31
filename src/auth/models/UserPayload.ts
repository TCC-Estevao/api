export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  spendingLimit?: number;
  iat?: number;
  exp?: number;
}
