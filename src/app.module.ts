import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getConfig } from 'config/server';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { LevelModule } from './modules/level/level.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { CategoryModule } from './modules/category/category.module';
import { CourseModule } from './modules/course/course.module';
import { OrderItemsModule } from './modules/order_items/order_items.module';
import { OrderModule } from './modules/order/order.module';
import { PromotionModule } from './modules/promotion/promotion.module';

import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import StripeService from './modules/stripe/stripe.service';
import { CustomerModule } from './modules/customer/customer.module';

function myFunction(arg: CategoryModule) {
  console.log(getConfig());
}
@Module({
  imports: [
    MongooseModule.forRoot(getConfig().MONGO_URL),
    PermissionModule,
    RoleModule,
    LevelModule,
    LessonModule,
    CategoryModule,
    CourseModule,
    OrderModule,
    OrderItemsModule,
    PromotionModule,   
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(),
        // ...
      })
    }),
    CustomerModule,
  ],
  controllers: [],
  providers: [
    StripeService,
    {
      provide: 'ABC',
      useFactory: myFunction,
      inject: [
        {
          token: CategoryModule,
          optional: true
        }
      ]
    },

  ],

})
export class AppModule { }
