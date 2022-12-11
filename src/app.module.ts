import { Module, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getConfig } from 'config/server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role_permission/role_permission.module';
import { RoleModule } from './role/role.module';
import {  } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(getConfig().MONGO_URL),
    PermissionModule,
    RolePermissionModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
