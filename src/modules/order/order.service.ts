import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationParam, toPaginationResponse } from 'src/common/util/pagination.util';
import { SearchFilter } from 'src/common/util/search.util';
import { CreateOrderDto, UpdateOrderDto } from 'src/database/dto/order.dto';
import { CreateStripe, CreateStripeDto } from 'src/database/dto/stripe.dto';
import { Order, OrderDocument } from 'src/database/entities/order.schema';
import { CustomerService } from '../customer/customer.service';
import { PromotionService } from '../promotion/promotion.service';
import StripeService from '../stripe/stripe.service';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private promotionService: PromotionService,
    private readonly stripeService: StripeService,
    private readonly customerService: CustomerService,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { promotions } = createOrderDto;

    createOrderDto.promotions = [];
    for (let p of promotions) {
      const isActive = await this.promotionService.check(p);
      if (isActive) {
        createOrderDto.promotions.push(p)
      }
    }

    const createdItem = new this.orderModel(createOrderDto);
    await createdItem.populate('items');

    return await createdItem.save();
  }

  async findAll(filter: SearchFilter) {
    const { page, size, sort, textSearch } = filter;

    let filters: FilterQuery<OrderDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }
    let query = this.orderModel.find(filters);
    const total = await this.orderModel.find(filters).count();
    //pagination
    const param: PaginationParam = {
      query: query,
      total: total,
      page: page,
      size: size,
      sort: sort
    }

    return await toPaginationResponse(param);
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id)
      .populate('items')
      .populate('promotions');
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }

  async listCreditCards(stripeCustomerId: string) {
    return this.stripeService.listCreditCards(stripeCustomerId);
  }

  async pay(
    customerId: string,
    createStripeDto: CreateStripeDto,
  ) {
    const { orderId, ...stripeDto } = createStripeDto;
    const customer = await this.customerService.findOne(customerId);
    if (!customer) {
      return customer;
    }
    //strip
    const createStripe: CreateStripe = {
      payment_method: customer.paymentMethodIds[0],
      amount: stripeDto.amount,
      description: stripeDto.description,
    }
    const pay = await this.stripeService.pay(customer.stripeCustomerId, createStripe);

    //database
    if (pay && pay.status === 'succeeded') {
      const updateOrderDto: UpdateOrderDto = {
        status: pay.status,
        payment: pay.latest_charge.balance_transaction.amount,
        fee: pay.latest_charge.balance_transaction.fee,
        net: pay.latest_charge.balance_transaction.net,
      }

      return await this.update(orderId, updateOrderDto)
    }
    return pay;
  }

  async listPayments() {
    return this.stripeService.listPayments();
  }
}
