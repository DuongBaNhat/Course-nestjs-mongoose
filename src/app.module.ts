import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getConfig } from 'config/server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import {  } from '@nestjs/core';
import { LevelModule } from './modules/level/level.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { CategoryModule } from './modules/category/category.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    MongooseModule.forRoot(getConfig().MONGO_URL),
    PermissionModule,
    RoleModule,
    LevelModule,
    LessonModule,
    CategoryModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
