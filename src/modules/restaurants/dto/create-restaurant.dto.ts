import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsEmail,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RestaurantStatus } from '../entities/restaurant.entity';
import { Transform } from 'class-transformer';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'uuid-owner' })
  @IsUUID()
  @IsNotEmpty()
  owner_id: string;

  @ApiProperty({ example: 'My Restaurant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Best food in town' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  @IsString()
  logo_url?: string;

  @ApiPropertyOptional({ example: '123 Main St' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 34.0 })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: -6.0 })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: '+212600000000' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'contact@resto.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    enum: RestaurantStatus,
    default: RestaurantStatus.BASIC,
  })
  @IsOptional()
  @IsEnum(RestaurantStatus)
  status?: RestaurantStatus;

  @ApiPropertyOptional({ example: 'uuid-city' })
  @IsOptional()
  @IsString()
  city_id?: string;

  @ApiPropertyOptional({ example: 'uuid-category' })
  @IsOptional()
  @IsString()
  category_id?: string;

  @ApiPropertyOptional({ example: 'https://example.com/360-tour' })
  @IsOptional()
  @IsString()
  visit360_url?: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/watch?v=xxx' })
  @IsOptional()
  @IsString()
  video_url?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  is_active?: boolean;
}
