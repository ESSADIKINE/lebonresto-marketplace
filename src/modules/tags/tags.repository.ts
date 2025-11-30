import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsRepository {
  private readonly table = 'tags';

  constructor(private readonly supabase: SupabaseService) {}

  async create(data: CreateTagDto) {
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

  async findAll() {
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

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return data;
  }

  async update(id: string, data: UpdateTagDto) {
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

  async remove(id: string) {
    const { error } = await this.supabase
      .getClient()
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return { message: 'Tag deleted successfully' };
  }
}
