import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/database/entities/category.schema';
import { PaginationParam, toPaginationResponse } from 'src/common/util/pagination.util';
import { SearchFilter } from 'src/common/util/search.util';
import { CreateCategoryDto, UpdateCategoryDto } from '../../database/dto/category.dto';
import { downUtil, upUtil, getOrderMax } from 'src/common/util/function.util';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const orderMax = await getOrderMax(this.categoryModel);
    const createdItem = new this.categoryModel({ ...createCategoryDto, order: (orderMax + 1)});
    return await createdItem.save();
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
    return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id)
      .catch(err => err);
  }

  async up(id: string) {

    let cateUp = await this.categoryModel.findById(id);
    if (!cateUp) {
      throw new BadRequestException('Not found');
    }

    return await upUtil(cateUp, this.categoryModel, id);
  }

  async down(id: string) {
    let cateDown = await this.categoryModel.findById(id);
    if (!cateDown) {
      throw new BadRequestException('Not found');
    }

    return await downUtil(cateDown, this.categoryModel, id);
  }

}
