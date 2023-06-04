import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as process from "process";
import { User } from "../users/user.model";
import { SEQUELIZE_PROVIDER } from 'src/constants';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from "../roles/user-roles.model";
import {Promt} from "../promt/entities/promt.model";
import {GeneratedResponse} from "../generator/entities/generated.response.model";

export const databaseProviders = [
  {
    provide: SEQUELIZE_PROVIDER,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
      });
      sequelize.addModels([User, Role, UserRoles, Promt, GeneratedResponse]);
      await sequelize.sync();
      return sequelize;
    },
  },
  ];