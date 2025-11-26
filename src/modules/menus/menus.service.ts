import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenusService {
    private readonly logger = new Logger(MenusService.name);
    private readonly table = 'menus';

    constructor(private readonly supabase: SupabaseService) { }

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(createMenuDto)
            .select()
            .single();

        if (error) {
            this.logger.error(`Error creating menu: ${error.message}`);
            throw new InternalServerErrorException('Could not create menu');
        }

        return data;
    }

    async findAllByRestaurant(restaurantId: string): Promise<Menu[]> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('restaurant_id', restaurantId);

        if (error) {
            this.logger.error(`Error finding menus: ${error.message}`);
            throw new InternalServerErrorException('Error finding menus');
        }

        return data;
    }
}
