import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from 'src/common/util/modules.util';
import { CourseService } from '../course/course.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, CourseService]
})
export class OrderItemsModule { }
