import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty({ example: 'uuid-restaurant' })
  @IsUUID()
  @IsNotEmpty()
  restaurant_id: string;

  @ApiProperty({ example: 'Live Music Night' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Jazz band playing live' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2023-12-31T20:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  event_date: string;

  @ApiPropertyOptional({ example: 'https://example.com/event.jpg' })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  is_paid?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  requires_reservation?: boolean;
}
