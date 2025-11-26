import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    // TODO: Add profile endpoints protected by JwtAuthGuard
}
