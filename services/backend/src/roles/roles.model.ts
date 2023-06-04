import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "./user-roles.model";
import { User } from "src/users/user.model";

interface RolesCreationAttrs {
    value: string,
    description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RolesCreationAttrs> {

    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'USER', description: 'Unique type of role'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'User role', description: 'Role description'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    roles: User[]
}