import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/database/entities/role.schema';
import { RolePermission, RolePermissionSchema } from 'src/database/entities/role_permission.schema';

@Module({ 
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      {name: RolePermission.name, schema: RolePermissionSchema}
    ])
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule { }
