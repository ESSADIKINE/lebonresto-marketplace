export enum NotificationType {
  SYSTEM = 'system',
  REMINDER = 'reminder',
  PROMO = 'promo',
}

export class Notification {
  id: string;
  user_id: string;
  message: string;
  type: NotificationType;
  seen: boolean;
  created_at: Date;
}
