import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from "./user.providers";
import { roleProviders } from "../roles/roles.providers";
import { userRolesProviders } from "../roles/user-roles.providers";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [UsersService,
              ...userProviders,
               ...roleProviders,
              ...userRolesProviders],
  controllers: [UsersController],
  imports: [
      RolesModule,
      forwardRef(() => AuthModule),
  ],
  exports: [
      ...userProviders,
      UsersService,
  ]
})
export class UsersModule {}
