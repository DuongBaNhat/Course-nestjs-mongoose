import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PermissionDocument = HydratedDocument<Role>;

@Schema()
export class Role {

    @Prop()
    name: string;
}
export const RoleSchema = SchemaFactory.createForClass(Role);
