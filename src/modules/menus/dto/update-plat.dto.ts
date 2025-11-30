import { PartialType } from '@nestjs/swagger';
import { CreatePlatDto } from './create-plat.dto';

export class UpdatePlatDto extends PartialType(CreatePlatDto) {}
