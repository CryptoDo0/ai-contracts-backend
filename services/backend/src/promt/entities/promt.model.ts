import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {GeneratedResponse} from "../../generator/entities/generated.response.model";

interface PromtCreationAttrs {
    title: string,
    content: string,
}

@Table({tableName: 'promts'})
export class Promt extends Model<Promt, PromtCreationAttrs> {

    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Title', description: 'Promt title'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: 'Content', description: 'Promt content'})
    @Column({type: DataType.STRING(20000), allowNull: false})
    content: string;
    
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW, allowNull: false })
    createdAt: Date
    
    @HasMany(() => GeneratedResponse)
    answers: GeneratedResponse[]
}