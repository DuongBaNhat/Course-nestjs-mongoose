import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Types,Document } from "mongoose";
import { Permission } from "./permission.schema";
import { RolePermission } from "./role_permission.schema";

export type RoleDocument = Role & Document;
// export type PermissionDocument = HydratedDocument<Role>;

@Schema()
export class Role {

    @Prop()
    name: string;

    // @Prop({
    //     type: [{ type: Types.ObjectId, ref: Permission.name }],
    // })
    // @Type(() => Permission)
    // permissions: Permission;

    // @Prop({ type: [{ type: Types.ObjectId, ref: 'RolePermission' }] })
    // rolePers: RolePermission[];
}
export const RoleSchema = SchemaFactory.createForClass(Role);
