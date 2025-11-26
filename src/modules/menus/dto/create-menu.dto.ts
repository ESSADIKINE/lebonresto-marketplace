import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
    @ApiProperty({ example: 'Lunch Menu' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ example: 'Available from 12pm to 3pm' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'uuid-restaurant' })
    @IsUUID()
    @IsNotEmpty()
    restaurant_id: string;
}
