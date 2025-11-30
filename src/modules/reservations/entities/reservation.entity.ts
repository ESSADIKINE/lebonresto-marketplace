export enum ReservationMethod {
  WHATSAPP = 'whatsapp',
  SMS = 'sms',
  EMAIL = 'email',
  SHEET = 'sheet',
}

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export class Reservation {
  id: string;
  customer_id: string;
  restaurant_id: string;
  reservation_time: Date;
  guest_count: number;
  notes?: string;
  automation_method: ReservationMethod;
  status: ReservationStatus;
  created_at: Date;
  updated_at: Date;
}
