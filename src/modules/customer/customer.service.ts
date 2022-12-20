import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import StripeService from '../stripe/stripe.service';
import { Customer, CustomerDocument } from '../../database/entities/customer.schema';
import { AddCardCustomerDto, CardDto, CreateCustomerDto, UpdateCustomerDto } from 'src/database/dto/customer.dto';
import { async } from 'rxjs';

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

    if (stripeCustomer) {
      return await createdItem.save();
    }
    return stripeCustomer;
  }

  async addCard(id: string, cardDto: CardDto) {
    const customer = await this.findOne(id);
    if (!customer) {
      return customer;
    }
    const card = await this.stripeService.addCard(customer.stripeCustomerId, cardDto)
    if (card) {
      customer.paymentMethodIds.push(card.id);
      return await this.update(id, { paymentMethodIds: customer.paymentMethodIds });
    }

    return card;
  }

  async findAll() {
    return await this.customerModel.find();
  }

  async findOne(id: string) {
    return await this.customerModel.findById(id);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerModel.findByIdAndUpdate(id, updateCustomerDto);
  }

  async remove(id: string) {
    return await this.customerModel.findByIdAndDelete(id);
  }
}
