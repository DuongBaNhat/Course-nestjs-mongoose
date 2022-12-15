import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationParam, toPaginationResponse } from 'src/common/util/pagination.util';
import { SearchFilter } from 'src/common/util/search.util';
import { CreateOrderItemDto, UpdateOrderItemDto } from 'src/database/dto/order_item.dto';
import { OrderItem, OrderItemDocument } from 'src/database/entities/order_items.schema';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItemDocument>,
  ) { }


  async create(createOrderItemDto: CreateOrderItemDto) {
    const createdItem = new this.orderItemModel(createOrderItemDto);
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
}
