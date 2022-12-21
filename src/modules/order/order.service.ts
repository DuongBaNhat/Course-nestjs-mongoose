import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationParam, toPaginationResponse } from 'src/common/util/pagination.util';
import { SearchFilter } from 'src/common/util/search.util';
import { CreateOrderDto, UpdateOrderDto } from 'src/database/dto/order.dto';
import { CreateStripe, CreateStripeDto, CreateStripeRefundDto } from 'src/database/dto/stripe.dto';
import { Course, CourseDocument } from 'src/database/entities/course.schema';
import { Order, OrderDocument } from 'src/database/entities/order.schema';
import { CustomerService } from '../customer/customer.service';
import { OrderItemsService } from '../order_items/order_items.service';
import { PromotionService } from '../promotion/promotion.service';
import StripeService from '../stripe/stripe.service';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private promotionService: PromotionService,
    private readonly stripeService: StripeService,
    private readonly customerService: CustomerService,
    private readonly orderItemsService: OrderItemsService,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { promotion } = createOrderDto;

    const isActive = await this.promotionService.check(promotion);
    if (!isActive) {
      throw new BadRequestException(promotion);
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
      .populate('promotion');
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
    const order = await this.findOne(orderId);
    if (!order) {
      return order;
    }
    const promotionId = order.promotion._id.toString()
    const isPromotion = await this.promotionService.check(promotionId);
    if (!isPromotion) {
      throw new BadRequestException(promotionId);
    }
    
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
        charge: pay.latest_charge.id,
      }

      return await this.update(orderId, updateOrderDto)
    }
    return pay;
  }

  async listPayments() {
    return this.stripeService.listPayments();
  }

  async refund(charge: string, createStripeRefundDto: CreateStripeRefundDto) {
    const { orderId, ...stripeRefundDto } = createStripeRefundDto;

    const refund = await this.stripeService.refund(charge);

    //database
    if (refund && refund.status === 'succeeded') {
      const updateOrderDto: UpdateOrderDto = {
        status: refund.object,
        payment: 0,
        net: 0,
        refund: refund.id,
      }

      return await this.update(orderId, updateOrderDto)
    }

    return refund;
  }

  async getListCourse(customerId: string) {
    let filters: FilterQuery<OrderDocument> = {
      status: 'succeeded',
      customer: customerId,
    };

    let query = await this.orderModel.find(filters).populate('items').select({ items: 1 });
    // let query = await this.orderModel.find(filters, 'items').populate('items');

    let result = query.map(v => {
      return v.items;
    })
    const content = result.flat();
    const courseIds = content.map(c => {
      return c.idItem;
    })

    const courses = await this.courseModel.find({ _id: courseIds });
    const total = courses.length;

    return { courses, total };
  }

}
