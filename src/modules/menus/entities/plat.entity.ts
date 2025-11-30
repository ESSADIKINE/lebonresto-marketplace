export class Plat {
  id: string;
  restaurant_id: string;
  name: string;
  description?: string;
  price?: number;
  image_url?: string;
  is_published: boolean;
  is_premium: boolean;
  created_at: Date;
  updated_at: Date;
}
