import { Module } from '@nestjs/common';
import { PromtService } from './promt.service';
import { PromtController } from './promt.controller';
import {promtProviders} from "./promts.providers";

@Module({
  providers: [PromtService,
              ...promtProviders],
  controllers: [PromtController],
  exports: [PromtService]
})
export class PromtModule {}
