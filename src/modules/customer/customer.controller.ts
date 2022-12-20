import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiTags } from '@nestjs/swagger';
import { CardDto, CreateCustomerDto, UpdateCustomerDto } from 'src/database/dto/customer.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Post('add-card/:id')
  addCard(@Param('id') id: string, @Body() cardDto: CardDto) {
    return this.customerService.addCard(id, cardDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
