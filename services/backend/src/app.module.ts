import {Module} from "@nestjs/common"
import { DatabaseModule } from './database/database.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { doc } from "prettier";
import { GeneratorModule } from './generator/generator.module';
import { ExternalModule } from './external/external.module';
import { PromtModule } from './promt/promt.module';
import { FlattenModule } from './flatten/flatten.module';
import path = require("path");

@Module({
    controllers: [],
    providers: [UsersService],
    imports: [
        DatabaseModule,
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        RolesModule,
        AuthModule,
        FilesModule,
        GeneratorModule,
        ExternalModule,
        PromtModule,
        FlattenModule,
    ]
})
export class AppModule {

}