import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeController } from './charge.controller';
import StripeService from '../stripe/stripe.service';

@Module({
  controllers: [ChargeController],
  providers: [ChargeService, StripeService]
})
export class ChargeModule {}
