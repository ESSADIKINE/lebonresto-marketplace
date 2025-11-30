export class Feedback {
  id: string;
  customer_id: string;
  restaurant_id: string;
  reservation_id?: string;
  rating: number;
  comment?: string;
  sentiment_score?: number;
  created_at: Date;
}
