import { Controller } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Owners')
@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) { }
}
