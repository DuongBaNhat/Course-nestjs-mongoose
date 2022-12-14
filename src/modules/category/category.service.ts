import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/database/entities/category.schema';
import { PaginationParam, toPaginationResponse } from 'src/database/util/pagination.util';
import { SearchFilter } from 'src/database/util/search_util';
import { CreateCategoryDto, UpdateCategoryDto } from '../../database/dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const createdItem = new this.categoryModel(createCategoryDto);
    return await createdItem.save().catch(err => err);
  }

  async findAll(filter: SearchFilter) {
    const { page, size, textSearch, sort } = filter;

    let filters: FilterQuery<CategoryDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }

    let query = this.categoryModel.find(filters);
    const total = await this.categoryModel.find(filters).count();
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
    return await this.categoryModel.findById(id).catch(err => err);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto)
      .catch(err => err);
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id)
      .catch(err => err);
  }
}
