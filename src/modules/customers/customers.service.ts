import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
    private readonly logger = new Logger(CustomersService.name);
    private readonly table = 'customers';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: Partial<Customer>): Promise<Customer> {
        const { data: created, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(data)
            .select()
            .single();

        if (error) {
            this.logger.error(`Error creating customer: ${error.message}`);
            throw new InternalServerErrorException('Could not create customer');
        }

        return created;
    }

    async findOneByEmail(email: string): Promise<Customer | null> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
            this.logger.error(`Error finding customer by email: ${error.message}`);
            throw new InternalServerErrorException('Error finding customer');
        }

        return data;
    }

    async findOneById(id: string): Promise<Customer | null> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();

        if (error && error.code !== 'PGRST116') {
            this.logger.error(`Error finding customer by id: ${error.message}`);
            throw new InternalServerErrorException('Error finding customer');
        }

        return data;
    }
}
