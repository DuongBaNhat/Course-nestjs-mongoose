import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from 'src/common/util/modules.util';
import { PromotionService } from '../promotion/promotion.service';
import StripeService from '../stripe/stripe.service';
import { CustomerService } from '../customer/customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, PromotionService, StripeService, CustomerService]
})
export class OrderModule { }
