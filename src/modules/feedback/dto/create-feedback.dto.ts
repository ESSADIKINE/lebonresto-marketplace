import { IsNotEmpty, IsOptional, IsString, IsNumber, IsUUID, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFeedbackDto {
    @ApiProperty({ example: 'uuid-restaurant' })
    @IsUUID()
    @IsNotEmpty()
    restaurant_id: string;

    @ApiPropertyOptional({ example: 'uuid-reservation' })
    @IsOptional()
    @IsUUID()
    reservation_id?: string;

    @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating: number;

    @ApiPropertyOptional({ example: 'Great food!' })
    @IsOptional()
    @IsString()
    comment?: string;
}
