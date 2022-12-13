import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { modules } from 'src/database/util/modules.util';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
