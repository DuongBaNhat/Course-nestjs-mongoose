import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { ObjectId, Document } from "mongoose";

export type OrderItemDocument = OrderItem & Document;

@Schema()
export class OrderItem {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    idItem: string;

    @Prop()
    name: string;

    @Prop()
    amount: number;

    @Prop()
    price: number;


}
const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
OrderItemSchema.index({ name: 'text' });

export { OrderItemSchema };

