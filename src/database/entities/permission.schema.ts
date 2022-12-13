import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from 'class-transformer';
import { Document, ObjectId } from "mongoose";

export type PermissionDocument = Permission & Document;
@Schema()
export class Permission {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    name: string;

    @Prop()
    code: string;

}

export const PermissionSchema = SchemaFactory.createForClass(Permission);