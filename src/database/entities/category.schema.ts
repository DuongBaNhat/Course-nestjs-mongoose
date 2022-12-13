import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ index: true })
  name: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ name: 'text' });

export { CategorySchema };
