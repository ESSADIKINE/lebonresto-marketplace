export class Customer {
  id: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  is_verified: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}
