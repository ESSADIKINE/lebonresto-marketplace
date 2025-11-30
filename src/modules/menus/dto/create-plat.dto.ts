import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePlatDto {
  @ApiProperty({ example: 'uuid-restaurant' })
  @IsUUID()
  @IsNotEmpty()
  restaurant_id: string;

  @ApiProperty({ example: 'Burger' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Delicious beef burger' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 10.5 })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 'https://example.com/burger.jpg' })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  is_published?: boolean;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  is_premium?: boolean;
}
