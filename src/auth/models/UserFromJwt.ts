export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  spendingLimit?: number;
}
