import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from 'src/common/util/modules.util';
import { PromotionService } from '../promotion/promotion.service';
import StripeService from '../stripe/stripe.service';
import { CustomerService } from '../customer/customer.service';
import { OrderItemsService } from '../order_items/order_items.service';
import { CourseService } from '../course/course.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, PromotionService, 
    StripeService, CustomerService, OrderItemsService, CourseService]
})
export class OrderModule { }
