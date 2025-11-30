export enum AdminRole {
  MANAGER = 'manager',
  SUPERADMIN = 'superadmin',
}

export class Admin {
  id: string;
  email: string;
  password_hash: string;
  full_name?: string;
  avatar_url?: string;
  role: AdminRole;
  created_at: Date;
  updated_at: Date;
}
