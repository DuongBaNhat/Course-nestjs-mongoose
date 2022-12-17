import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import StripeService from '../stripe/stripe.service';
import { Customer, CustomerDocument } from '../../database/entities/customer.schema';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/database/dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private stripeService: StripeService
  ) { }


  async create(createCustomerDto: CreateCustomerDto) { 
    const stripeCustomer = await this.stripeService.createCustomer(createCustomerDto.name, createCustomerDto.email);

    const createdItem = new this.customerModel({
      ...createCustomerDto, stripeCustomerId: stripeCustomer.id
    });

    const newCustomer = await createdItem.save();
    return newCustomer;
  }

  async findAll() {
    return await this.customerModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerModel.findByIdAndUpdate(id, updateCustomerDto);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
