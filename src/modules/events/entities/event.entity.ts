export class Event {
  id: string;
  restaurant_id: string;
  title: string;
  description?: string;
  event_date: Date;
  image_url?: string;
  is_paid: boolean;
  price?: number;
  requires_reservation: boolean;
  created_at: Date;
}
