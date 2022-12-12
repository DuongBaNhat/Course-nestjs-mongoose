import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Transform, Type } from 'class-transformer';
import { HydratedDocument, Types , Document} from "mongoose";
import { Role } from "./role.schema";
import { RolePermission } from "./role_permission.schema";
export type PermissionDocument = Permission & Document;

// export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission {
    @Prop()
    name: string;

    @Prop()
    code: string;
    
    @Prop({
        type: [{ type: Types.ObjectId, ref: Role.name }],
    })
    @Type(() => Role)
    roles: Role;
    // @Prop({ type: [{ type: Types.ObjectId, ref: 'RolePermission' }] })
    // rolePemissions: RolePermission[];

}

export const PermissionSchema = SchemaFactory.createForClass(Permission);