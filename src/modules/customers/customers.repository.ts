import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersRepository {
  private readonly table = 'customers';

  constructor(private readonly supabase: SupabaseService) {}

  async create(data: Partial<Customer>): Promise<Customer> {
    const { data: created, error } = await this.supabase
      .getClient()
      .from(this.table)
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return created;
  }

  async findAll(): Promise<Customer[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async findOne(id: string): Promise<Customer> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return data;
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    const { data: updated, error } = await this.supabase
      .getClient()
      .from(this.table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase
      .getClient()
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findReservations(customerId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('reservations')
      .select('*')
      .eq('customer_id', customerId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findNotifications(customerId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('notifications')
      .select('*')
      .eq('user_id', customerId)
      .order('created_at', { ascending: false });
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findFeedback(customerId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('feedback')
      .select('*')
      .eq('customer_id', customerId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOneByEmail(email: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
}
