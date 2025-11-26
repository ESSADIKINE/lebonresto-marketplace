import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Plat } from './entities/plat.entity';
import { CreatePlatDto } from './dto/create-plat.dto';

@Injectable()
export class PlatsService {
    private readonly logger = new Logger(PlatsService.name);
    private readonly table = 'plats';

    constructor(private readonly supabase: SupabaseService) { }

    async create(createPlatDto: CreatePlatDto, imageUrl?: string): Promise<Plat> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert({ ...createPlatDto, image_url: imageUrl })
            .select()
            .single();

        if (error) {
            this.logger.error(`Error creating plat: ${error.message}`);
            throw new InternalServerErrorException('Could not create plat');
        }

        return data;
    }

    async findAllByRestaurant(restaurantId: string): Promise<Plat[]> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('restaurant_id', restaurantId);

        if (error) {
            this.logger.error(`Error finding plats: ${error.message}`);
            throw new InternalServerErrorException('Error finding plats');
        }

        return data;
    }
}
