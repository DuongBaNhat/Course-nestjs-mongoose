import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationParam, toPaginationResponse } from 'src/common/util/pagination.util';
import { SearchFilter } from 'src/common/util/search.util';
import { Promotion, PromotionDocument } from 'src/database/entities/promotion.schema';
import { CreatePromotionDto, UpdatePromotionDto } from '../../database/dto/promotion.dto';

@Injectable()
export class PromotionService {

  constructor(
    @InjectModel(Promotion.name) private promotionModel: Model<PromotionDocument>,
  ) { }

  async create(createPromotionDto: CreatePromotionDto) {
    const createdItem = new this.promotionModel(createPromotionDto);

    return createdItem.save();
  }

  async findAll(filter: SearchFilter) {
    const { page, size, sort, textSearch } = filter;

    let filters: FilterQuery<PromotionDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }
    let query = this.promotionModel.find(filters);
    const total = await this.promotionModel.find(filters).count();
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
    return await this.promotionModel.findById(id);
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    return await this.promotionModel.findByIdAndUpdate(id, updatePromotionDto);
  }

  async remove(id: string) {
    return await this.promotionModel.findByIdAndDelete(id);
  }

  async check(id: string) {
    const promotion = await this.promotionModel.findById(id);
    if (promotion && (promotion.status === 'active')) {
      return true;
    }
    return false;
  }
}
