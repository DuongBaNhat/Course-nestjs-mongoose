import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from 'src/common/util/modules.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
