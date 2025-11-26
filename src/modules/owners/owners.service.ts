import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
    private readonly logger = new Logger(OwnersService.name);
    private readonly table = 'owners';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: Partial<Owner>): Promise<Owner> {
        const { data: created, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(data)
            .select()
            .single();

        if (error) {
            this.logger.error(`Error creating owner: ${error.message}`);
            throw new InternalServerErrorException('Could not create owner');
        }

        return created;
    }

    async findOneByEmail(email: string): Promise<Owner | null> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') {
            this.logger.error(`Error finding owner by email: ${error.message}`);
            throw new InternalServerErrorException('Error finding owner');
        }

        return data;
    }

    async findOneById(id: string): Promise<Owner | null> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();

        if (error && error.code !== 'PGRST116') {
            this.logger.error(`Error finding owner by id: ${error.message}`);
            throw new InternalServerErrorException('Error finding owner');
        }

        return data;
    }
}
