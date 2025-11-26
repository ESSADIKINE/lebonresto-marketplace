import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
    private readonly logger = new Logger(FeedbackService.name);
    private readonly table = 'feedback';

    constructor(private readonly supabase: SupabaseService) { }

    async create(customerId: string, createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert({ ...createFeedbackDto, customer_id: customerId })
            .select()
            .single();

        if (error) {
            this.logger.error(`Error creating feedback: ${error.message}`);
            throw new InternalServerErrorException('Could not create feedback');
        }

        return data;
    }

    async findAllByRestaurant(restaurantId: string): Promise<Feedback[]> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('restaurant_id', restaurantId);

        if (error) {
            this.logger.error(`Error finding feedback: ${error.message}`);
            throw new InternalServerErrorException('Error finding feedback');
        }

        return data;
    }
}
