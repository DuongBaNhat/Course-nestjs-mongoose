import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from 'src/database/util/modules.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
