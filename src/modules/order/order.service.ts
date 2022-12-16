import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationParam, toPaginationResponse } from 'src/common/util/pagination.util';
import { SearchFilter } from 'src/common/util/search.util';
import { CreateOrderDto, UpdateOrderDto } from 'src/database/dto/order.dto';
import { Order, OrderDocument } from 'src/database/entities/order.schema';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const createdItem = new this.orderModel(createOrderDto);
    await createdItem.populate('items');
    await createdItem.populate('promotions');

    return createdItem.save();
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

  async pay(id: string) {
    const status = 'success';
    return await this.orderModel.findByIdAndUpdate(id, { status: status });
  }
}
