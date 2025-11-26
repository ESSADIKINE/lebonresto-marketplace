import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
    private readonly logger = new Logger(RestaurantsService.name);
    private readonly table = 'restaurants';

    constructor(private readonly supabase: SupabaseService) { }

    async create(ownerId: string, createRestaurantDto: CreateRestaurantDto, logoUrl?: string): Promise<Restaurant> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert({
                ...createRestaurantDto,
                owner_id: ownerId,
                logo_url: logoUrl,
            })
            .select()
            .single();

        if (error) {
            this.logger.error(`Error creating restaurant: ${error.message}`);
            throw new InternalServerErrorException('Could not create restaurant');
        }

        return data;
    }

    async findAll(): Promise<Restaurant[]> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*');

        if (error) {
            this.logger.error(`Error finding restaurants: ${error.message}`);
            throw new InternalServerErrorException('Error finding restaurants');
        }

        return data;
    }

    async findOne(id: string): Promise<Restaurant> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            this.logger.error(`Error finding restaurant: ${error.message}`);
            throw new InternalServerErrorException('Error finding restaurant');
        }

        return data;
    }
}
