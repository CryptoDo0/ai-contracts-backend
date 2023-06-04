import { Module } from '@nestjs/common';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import {ExternalModule} from "../external/external.module";
import {PromtModule} from "../promt/promt.module";
import {generatedResponseProviders} from "./generaded.response.provider";
import {FlattenModule} from "../flatten/flatten.module";

@Module({
  imports: [ExternalModule, PromtModule, FlattenModule],
  controllers: [GeneratorController],
  providers: [GeneratorService,
              ...generatedResponseProviders]
})
export class GeneratorModule {}
