import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";

export type CustomerDocument = Customer & Document;
@Schema()
export class Customer {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    public email: string;

    @Prop({ index: true })
    public name: string;

    @Prop()
    public password: string;

    @Prop()
    public stripeCustomerId: string;

    @Prop()
    public paymentMethodIds: string[];
    // ...
}

const CustomerSchema = SchemaFactory.createForClass(Customer);
CustomerSchema.index({ name: 'text' });

export { CustomerSchema };