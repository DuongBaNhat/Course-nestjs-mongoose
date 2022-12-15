import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { OrderItem } from './order_items.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ index: true })
    name: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: OrderItem.name }],
    })
    @Type(() => OrderItem)
    items: OrderItem;


}
const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ name: 'text' });

export { OrderSchema };