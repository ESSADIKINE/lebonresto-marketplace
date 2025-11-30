import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly table = 'notifications';

  constructor(private readonly supabase: SupabaseService) {}

  async findAllByUser(userId: string): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      this.logger.error(`Error finding notifications: ${error.message}`);
      throw new InternalServerErrorException('Error finding notifications');
    }

    return data;
  }

  async markAsSeen(id: string): Promise<void> {
    const { error } = await this.supabase
      .getClient()
      .from(this.table)
      .update({ seen: true })
      .eq('id', id);

    if (error) {
      this.logger.error(`Error marking notification as seen: ${error.message}`);
      throw new InternalServerErrorException('Error updating notification');
    }
  }
}
