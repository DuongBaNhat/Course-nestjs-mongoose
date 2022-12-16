import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from 'src/common/util/modules.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...modules(),
    ])
  ],
  controllers: [PromotionController],
  providers: [PromotionService]
})
export class PromotionModule {}
