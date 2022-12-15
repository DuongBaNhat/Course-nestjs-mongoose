import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Lesson, LessonDocument } from 'src/database/entities/lesson.schema';
import { PaginationParam, toPaginationResponse } from 'src/common/util/pagination.util';
import { SearchFilter } from 'src/common/util/search.util';
import { CreateLessonDto, UpdateLessonDto } from '../../database/dto/lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) { }
  async create(createLessonDto: CreateLessonDto) {
    const createdItem = new this.lessonModel(createLessonDto);
    return await createdItem.save().catch(err => err);
  }

  async findAll(@Query() filter: SearchFilter) {
    const { page, size, sort, textSearch } = filter;

    let filters: FilterQuery<LessonDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }
    let query = this.lessonModel.find(filters);
    const total = await this.lessonModel.find(filters).count();
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
    return await this.lessonModel.findById(id).catch(err => err);
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    return await this.lessonModel.findByIdAndUpdate(id, updateLessonDto)
      .catch(err => err);
  }

  async remove(id: string) {
    return await this.lessonModel.findByIdAndDelete(id)
      .catch(err => err);
  }
}
