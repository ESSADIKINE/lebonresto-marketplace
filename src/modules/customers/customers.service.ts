import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  create(createCustomerDto: CreateCustomerDto | any) {
    return this.customersRepository.create(createCustomerDto);
  }

  findAll() {
    return this.customersRepository.findAll();
  }

  findOne(id: string) {
    return this.customersRepository.findOne(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customersRepository.update(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.customersRepository.remove(id);
  }

  getReservations(id: string) {
    return this.customersRepository.findReservations(id);
  }

  getNotifications(id: string) {
    return this.customersRepository.findNotifications(id);
  }

  getFeedback(id: string) {
    return this.customersRepository.findFeedback(id);
  }

  findOneByEmail(email: string) {
    return this.customersRepository.findOneByEmail(email);
  }
}
