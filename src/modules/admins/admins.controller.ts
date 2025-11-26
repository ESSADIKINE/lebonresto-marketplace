import { Controller } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) { }
}
