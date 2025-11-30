import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CustomersService } from '../customers/customers.service';
import { OwnersService } from '../owners/owners.service';
import { AdminsService } from '../admins/admins.service';
import { LoginDto, UserType } from './dto/login.dto';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
// import { CreateOwnerDto } from '../owners/dto/create-owner.dto'; // To be created

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private ownersService: OwnersService,
    private adminsService: AdminsService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
    type: UserType,
  ): Promise<any> {
    let user: any;

    switch (type) {
      case UserType.CUSTOMER:
        user = await this.customersService.findOneByEmail(email);
        break;
      case UserType.OWNER:
        user = await this.ownersService.findOneByEmail(email);
        break;
      case UserType.ADMIN:
        user = await this.adminsService.findOneByEmail(email);
        break;
    }

    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...result } = user;
      return { ...result, type };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: user.type,
      role: user.role, // Only for admins
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.refreshSecret'),
        expiresIn: this.configService.get('jwt.refreshExpiresIn'),
      }),
      user,
    };
  }

  async registerCustomer(createCustomerDto: CreateCustomerDto) {
    const existing = await this.customersService.findOneByEmail(
      createCustomerDto.email,
    );
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const password_hash = await bcrypt.hash(createCustomerDto.password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...customerData } = createCustomerDto;

    return this.customersService.create({
      ...customerData,
      password_hash,
    });
  }

  // async registerOwner(createOwnerDto: CreateOwnerDto) { ... }
}
