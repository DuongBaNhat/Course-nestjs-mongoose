import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type LevelDocument = Level & Document;

@Schema()
export class Level {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ index: true })
  name: string;

  @Prop()
  order: number;
}

const LevelSchema = SchemaFactory.createForClass(Level);
LevelSchema.index({ name: 'text' });

export { LevelSchema };
