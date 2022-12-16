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
    code: string;

    @Prop()
    date: Date;

    @Prop()
    status: string;

    @Prop()
    percent: number;

    @Prop()
    fixed: number;
}
const PromotionSchema = SchemaFactory.createForClass(Promotion);
PromotionSchema.index({ name: 'text' });

export { PromotionSchema };