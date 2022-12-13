import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Category } from './category.schema';
import { Lesson } from './lesson.schema';
import { Level } from './level.schema';
import { Permission } from './permission.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ index: true })
    name: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: Level.name
    })
    @Type(() => Level)
    level: Level;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Lesson.name }],
    })
    @Type(() => Lesson)
    lessons: Lesson;


    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
    })
    @Type(() => Category)
    categorys: Category;
}

const CourseSchema = SchemaFactory.createForClass(Course);
CourseSchema.index({ name: 'text' });

export { CourseSchema };
