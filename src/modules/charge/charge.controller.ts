import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import StripeService from '../stripe/stripe.service';
import { ChargeService } from './charge.service';
import { CreateChargeDto, UpdateChargeDto } from '../../database/dto/charge.dto';

@ApiTags('charge')
@Controller('charge')
export class ChargeController {
  constructor(
    private readonly chargeService: ChargeService,
    private readonly stripeService: StripeService
  ) { }

  @Post('customer/:stripeCustomerId')
  async create(
    @Body() createChargeDto: CreateChargeDto,
    @Param('stripeCustomerId') stripeCustomerId: string
  ) {
    return await this.stripeService.charge(
      createChargeDto.amount,
      createChargeDto.paymentMethodId,
      stripeCustomerId
    );
  }

  // @Get()
  findAll() {
    return this.chargeService.findAll();
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chargeService.findOne(id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto) {
    return this.chargeService.update(id, updateChargeDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargeService.remove(id);
  }
}
