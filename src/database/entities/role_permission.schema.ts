import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PermissionDocument = HydratedDocument<RolePermission>;

@Schema()
export class RolePermission {
       
    @Prop()
    roleId: string;
    
    @Prop()
    permissionId: string;
}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermission);
