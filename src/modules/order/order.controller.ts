import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchFilter } from 'src/common/util/search.util';
// import { CreateChargeDto } from 'src/database/dto/charge.dto';
import { CreateOrderDto, UpdateOrderDto } from 'src/database/dto/order.dto';
import { CreateStripeDto, CreateStripeRefundDto } from 'src/database/dto/stripe.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }
  // @Get('listPayments')
  listPayments() {
    return this.orderService.listPayments();
  }
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() filter: SearchFilter) {
    return this.orderService.findAll(filter);
  }

  @Get('list-course/:customerId')
  getListCourse(@Param('customerId') customerId: string) {
    return this.orderService.getListCourse(customerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Get('cards/:stripeCustomerId')
  listCreditCards(@Param('stripeCustomerId') stripeCustomerId: string) {
    return this.orderService.listCreditCards(stripeCustomerId);
  }

  @Patch('pay/:customerId')
  async pay(
    @Param('customerId') customerId: string,
    @Body() createStripeDto: CreateStripeDto,
  ) {
    return this.orderService.pay(customerId, createStripeDto);
  }

  @Patch('refund/:charge')
  refund(@Param('charge') charge: string, @Body() createStripeRefundDto: CreateStripeRefundDto) {
    return this.orderService.refund(charge, createStripeRefundDto);
  }


}
