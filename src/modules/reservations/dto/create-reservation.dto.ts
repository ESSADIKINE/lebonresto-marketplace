import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReservationMethod } from '../entities/reservation.entity';

export class CreateReservationDto {
  @ApiProperty({ example: 'uuid-restaurant' })
  @IsUUID()
  @IsNotEmpty()
  restaurant_id: string;

  @ApiProperty({ example: 'uuid-customer' })
  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({ example: '2023-12-25T20:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  reservation_time: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsNotEmpty()
  guest_count: number;

  @ApiPropertyOptional({ example: 'Near window' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    enum: ReservationMethod,
    default: ReservationMethod.EMAIL,
  })
  @IsOptional()
  @IsEnum(ReservationMethod)
  automation_method?: ReservationMethod;
}
