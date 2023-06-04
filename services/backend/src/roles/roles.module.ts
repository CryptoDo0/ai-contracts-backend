import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { roleProviders } from "./roles.providers";
import { userProviders } from "../users/user.providers";
import { userRolesProviders } from "./user-roles.providers";

@Module({
  controllers: [RolesController],
  providers: [
      RolesService,
      ...roleProviders,
      ...userProviders,
       ...userRolesProviders],
    exports: [
      ...roleProviders,
      RolesService
  ]
})
export class RolesModule {}
