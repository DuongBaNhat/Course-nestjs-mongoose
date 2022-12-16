import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";

export type PromotionDocument = Promotion & Document;

@Schema()
export class Promotion {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ index: true })
    name: string;

    @Prop()
    value: number;

    @Prop()
    date: Date;
}
const PromotionSchema = SchemaFactory.createForClass(Promotion);
PromotionSchema.index({ name: 'text' });

export { PromotionSchema };