import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private readonly logger = new Logger(SupabaseService.name);
  private client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const supabaseUrl = this.configService.get<string>('database.url');
    const supabaseKey = this.configService.get<string>('database.key');

    if (!supabaseUrl || !supabaseKey) {
      this.logger.error('Supabase URL or Key is missing!');
      return;
    }

    this.client = createClient(supabaseUrl, supabaseKey);
    this.logger.log('Supabase Client Initialized');
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
