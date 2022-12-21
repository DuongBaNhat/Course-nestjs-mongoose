import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationParam, toPaginationResponse } from 'src/common/util/pagination.util';
import { SearchFilter } from 'src/common/util/search.util';
import { CreateOrderDto } from 'src/database/dto/order.dto';
import { CreateOrderItem, CreateOrderItemDto, UpdateOrderItemDto } from 'src/database/dto/order_item.dto';
import { OrderItem, OrderItemDocument } from 'src/database/entities/order_items.schema';
import { CourseService } from '../course/course.service';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItemDocument>,
    private courseService: CourseService,
  ) { }


  async create(createOrderItemDto: CreateOrderItemDto) {
    const { idItem, amount } = createOrderItemDto;
    const item = await this.courseService.findOne(idItem);
    if (!item) {
      return item;
    }
    const param: CreateOrderItem = {
      idItem: idItem,
      name: item.name,
      amount: amount,
      price: item.price
    }
    const createdItem = new this.orderItemModel(param);
    return createdItem.save();
  }

  async findAll(@Query() filter: SearchFilter) {
    const { page, size, sort, textSearch } = filter;

    let filters: FilterQuery<OrderItemDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }
    let query = this.orderItemModel.find(filters);
    const total = await this.orderItemModel.find(filters).count();
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
    return await this.orderItemModel.findById(id);
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return await this.orderItemModel.findByIdAndUpdate(id, updateOrderItemDto);
  }

  async remove(id: string) {
    return await this.orderItemModel.findByIdAndDelete(id);
  }

  async getTotal(itemId: string[]) {
    const items = await this.orderItemModel.find({_id: itemId});
    let total = 10;
    for(let item of items) {
      total += item.amount * item.price;
    }

    console.log(items);
    
    return total;
  }
}
