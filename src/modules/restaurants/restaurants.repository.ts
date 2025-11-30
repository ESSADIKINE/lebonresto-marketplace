import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsRepository {
  private readonly table = 'restaurants';

  constructor(private readonly supabase: SupabaseService) {}

  async create(data: Partial<Restaurant>): Promise<Restaurant> {
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

  async findAll(): Promise<Restaurant[]> {
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

  async findOne(id: string): Promise<Restaurant> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    return data;
  }

  async update(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
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

  // Relational Queries

  async findMenus(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('menus')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findPlats(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('plats')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findImages(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_images')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findTags(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_tags')
      .select('tags(*)')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data.map((item: any) => item.tags);
  }

  async findEvents(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('events')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findReservations(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('reservations')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findFeedback(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('feedback')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async search(filters: {
    cityId?: string;
    categoryId?: string;
    tagId?: string;
    q?: string;
  }) {
    let query = this.supabase.getClient().from(this.table).select('*');

    if (filters.cityId) {
      query = query.eq('city_id', filters.cityId);
    }
    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }
    if (filters.q) {
      query = query.or(
        `name.ilike.%${filters.q}%,description.ilike.%${filters.q}%`,
      );
    }

    if (filters.tagId) {
      // This is a bit complex with Supabase simple client, usually requires a join or subquery.
      // For simplicity in this "test connectivity" phase, we might fetch restaurant_tags first.
      const { data: tagData } = await this.supabase
        .getClient()
        .from('restaurant_tags')
        .select('restaurant_id')
        .eq('tag_id', filters.tagId);

      if (tagData) {
        const ids = tagData.map((t) => t.restaurant_id);
        query = query.in('id', ids);
      }
    }

    const { data, error } = await query;
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  /**
   * Updates the drive_folder_id for a restaurant
   * @param id - The restaurant ID
   * @param driveFolderId - The Google Drive folder ID
   * @returns The updated restaurant
   */
  async updateDriveFolderId(
    id: string,
    driveFolderId: string,
  ): Promise<Restaurant> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .update({ drive_folder_id: driveFolderId })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!data) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    return data;
  }

  /**
   * Add an image to a restaurant
   * @param restaurantId - The restaurant ID
   * @param url - The image URL
   * @param label - Optional label for the image
   */
  async addImage(restaurantId: string, url: string, label?: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_images')
      .insert({
        restaurant_id: restaurantId,
        url,
        label: label ?? null,
      })
      .select('*')
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  /**
   * Link a tag to a restaurant
   * @param restaurantId - The restaurant ID
   * @param tagId - The tag ID
   */
  async addTag(restaurantId: string, tagId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_tags')
      .insert({
        restaurant_id: restaurantId,
        tag_id: tagId,
      })
      .select('*')
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  /**
   * Link multiple tags to a restaurant
   * @param restaurantId - The restaurant ID
   * @param tagIds - Array of tag IDs
   */
  async addTags(restaurantId: string, tagIds: string[]) {
    const records = tagIds.map((tagId) => ({
      restaurant_id: restaurantId,
      tag_id: tagId,
    }));

    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_tags')
      .insert(records)
      .select('*');

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
  async countImages(restaurantId: string): Promise<number> {
    const { count, error } = await this.supabase
      .getClient()
      .from('restaurant_images')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return count || 0;
  }
}
