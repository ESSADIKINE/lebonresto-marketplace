import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
    private readonly logger = new Logger(ReservationsService.name);
    private readonly table = 'reservations';

    constructor(private readonly supabase: SupabaseService) { }

    async create(customerId: string, createReservationDto: CreateReservationDto): Promise<Reservation> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert({ ...createReservationDto, customer_id: customerId })
            .select()
            .single();

        if (error) {
            this.logger.error(`Error creating reservation: ${error.message}`);
            throw new InternalServerErrorException('Could not create reservation');
        }

        return data;
    }

    async findAllByCustomer(customerId: string): Promise<Reservation[]> {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('customer_id', customerId);

        if (error) {
            this.logger.error(`Error finding reservations: ${error.message}`);
            throw new InternalServerErrorException('Error finding reservations');
        }

        return data;
    }
}
