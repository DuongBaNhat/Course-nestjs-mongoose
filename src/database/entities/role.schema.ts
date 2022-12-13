import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Permission } from './permission.schema';
 
export type RoleDocument = Role & Document;
 
@Schema()
export class Role {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
 
  @Prop({index: true})
  name: string;
   
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Permission.name }],
  })
  @Type(() => Permission)
  permissions: Permission;
}

const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.index({ name: 'text' });

export {RoleSchema};
