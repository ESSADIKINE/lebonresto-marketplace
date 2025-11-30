export enum RestaurantStatus {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export class Restaurant {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  logo_url?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  status: RestaurantStatus;
  city_id?: string;
  category_id?: string;
  visit360_url?: string;
  video_url?: string;
  is_active: boolean;
  view_count: number;
  rating_avg: number;
  drive_folder_id?: string;
  created_at: Date;
  updated_at: Date;
}
