import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Min } from 'class-validator';
import { Document, ObjectId } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ index: true })
  name: string;

  @Prop({min: 1})
  @Min(1)
  order: number;
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ name: 'text' });

export { CategorySchema };
