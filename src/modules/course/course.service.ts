import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { filter } from 'rxjs';
import { Course, CourseDocument } from 'src/database/entities/course.schema';
import { LessonDocument } from 'src/database/entities/lesson.schema';
import { PaginationParam, toPaginationResponse } from 'src/database/util/pagination.util';
import { SearchFilter } from 'src/database/util/search_util';
import { CreateCourseDto, UpdateCourseDto } from '../../database/dto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    const createdItem = new this.courseModel(createCourseDto);
    await createdItem.populate('level');
    await createdItem.populate('lessons');
    await createdItem.populate('categorys');

    return await createdItem.save().catch(err => err);
  }

  async findAll(filter: SearchFilter) {
    const { page, size, sort, textSearch } = filter;

    let filters: FilterQuery<LessonDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }
    let query = this.courseModel.find(filters);
    const total = await this.courseModel.find(filters).count();
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
    let result = this.courseModel.findById(id)
      .populate('level')
      .populate('lessons')
      .populate('categorys')
      .catch(err => err);

    return await result;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel.findByIdAndUpdate(id, updateCourseDto)
      .catch(err => err);
  }

  async remove(id: string) {
    return await this.courseModel.findByIdAndDelete(id)
      .catch(err => err);
  }
}
