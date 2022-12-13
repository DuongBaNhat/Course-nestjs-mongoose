import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/database/entities/category.schema';
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
    const { page, size, textSearch } = filter;
    const skip = (page - 1) * size, limit = size;

    let filters: FilterQuery<CategoryDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }

    const total = await this.categoryModel.find(filters).count();

    let query = this.categoryModel.find(filters);
    const content = await query.sort({ _id: 1 }).skip(skip).limit(limit);

    return { content, total, page, size };
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
