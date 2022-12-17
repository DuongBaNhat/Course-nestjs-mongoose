import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from 'src/common/util/modules.util';
import StripeService from '../stripe/stripe.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
 
@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    StripeService,
  ]
})
export class CustomerModule { }
