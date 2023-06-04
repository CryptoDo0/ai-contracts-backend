import { Module } from '@nestjs/common';
import { FlattenService } from './flatten.service';

@Module({
  providers: [FlattenService],
  exports: [FlattenService]
})
export class FlattenModule {}
