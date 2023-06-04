import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string,
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@user.com', description: 'Email address'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: true, description: 'User banned or not?'})
    @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: false})
    banned: boolean;

    @ApiProperty({example: 'Spam attack', description: 'Ban reson'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

}