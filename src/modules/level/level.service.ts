import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { LessonDocument } from 'src/database/entities/lesson.schema';
import { Level, LevelDocument } from 'src/database/entities/level.schema';
import { PaginationParam, toPaginationResponse } from 'src/database/util/pagination.util';
import { SearchFilter } from 'src/database/util/search_util';
import { CreateLevelDto, UpdateLevelDto } from '../../database/dto/level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectModel(Level.name) private levelModel: Model<LevelDocument>,
  ) { }

  async create(createLevelDto: CreateLevelDto) {
    const createdItem = new this.levelModel(createLevelDto);
    return await createdItem.save().catch(err => err);
  }

  async findAll(filter: SearchFilter) {
    const { page, size, sort, textSearch } = filter;

    let filters: FilterQuery<LevelDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }
    let query = this.levelModel.find(filters);
    const total = await this.levelModel.find(filters).count();
    // const total = await query.count();
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
    return await this.levelModel.findById(id).catch(err => err);
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    return await this.levelModel.findByIdAndUpdate(id, updateLevelDto)
      .catch(err => err);
  }

  async remove(id: string) {
    return await this.levelModel.findByIdAndDelete(id)
      .catch(err => err);
  }
}
