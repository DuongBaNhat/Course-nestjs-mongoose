import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from 'src/database/util/modules.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule { }
