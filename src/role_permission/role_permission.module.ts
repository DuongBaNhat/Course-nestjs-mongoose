import { Module } from '@nestjs/common';
import { RolePermissionService } from './role_permission.service';
import { RolePermissionController } from './role_permission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermission, RolePermissionSchema } from 'src/database/entities/role_permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: RolePermission.name,
      schema: RolePermissionSchema
    }])
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService]
})
export class RolePermissionModule {}
