import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {
    private readonly logger = new Logger(AdminsService.name);
    private readonly table = 'admins';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: Partial<Admin>): Promise<Admin> {
        const { data: created, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(data)
            .select()
            .single();

        if (error) {
            this.logger.error(`Error creating admin: ${error.message}`);
            throw new InternalServerErrorException('Could not create admin');
        }

        return created;
    }

    async findOneByEmail(email: string): Promise<Admin | null> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') {
            this.logger.error(`Error finding admin by email: ${error.message}`);
            throw new InternalServerErrorException('Error finding admin');
        }

        return data;
    }

    async findOneById(id: string): Promise<Admin | null> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();

        if (error && error.code !== 'PGRST116') {
            this.logger.error(`Error finding admin by id: ${error.message}`);
            throw new InternalServerErrorException('Error finding admin');
        }

        return data;
    }
}
