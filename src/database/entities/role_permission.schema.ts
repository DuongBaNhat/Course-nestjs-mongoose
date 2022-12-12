import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Mongoose, Types, Schema as  MongooseSchema } from "mongoose";
import { Permission } from "./permission.schema";
import { Role } from "./role.schema";

export type PermissionDocument = HydratedDocument<RolePermission>;

@Schema()
export class RolePermission {
       
    @Prop({ type: Types.ObjectId , ref: 'Role' })
    role: Role;
    
    // @Prop()
    // permissionId: string;

    @Prop({ type: Types.ObjectId , ref: 'Permission' })
    permission: Permission;
}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermission);
