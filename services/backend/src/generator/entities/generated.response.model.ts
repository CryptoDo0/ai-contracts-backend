
import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Promt} from "../../promt/entities/promt.model";
import {RequestType} from './inner/requestType';

interface GeneratedResponseCreationAttrs {
    sessionId: string,
    content: string,
    userPromt: string,
    promtId: number,
    promptTokens: number
    completionTokens: number
    totalTokens: number,
    requestType: RequestType
}

@Table({tableName: 'generated_responses'})
export class GeneratedResponse extends Model<GeneratedResponse, GeneratedResponseCreationAttrs> {

    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'csad3qedsaer13', description: 'Session id'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    sessionId: string;

    @ApiProperty({example: 'Content', description: 'Code'})
    @Column({type: DataType.STRING(20000), allowNull: false})
    content: string;
    
    @ApiProperty({example: 'Get solidity contract', description: 'User promt'})
    @Column({type: DataType.STRING(20000), allowNull: false})
    userPromt: string;
    
    @ApiProperty({example: 2000, description: 'Gpt promt tokens count'})
    @Column({type: DataType.INTEGER, allowNull: false})
    promptTokens: number;
    
    @ApiProperty({example: 3000, description: 'Gpt completion tokens count'})
    @Column({type: DataType.INTEGER, allowNull: false})
    completionTokens: number;
    
    @ApiProperty({example: 5000, description: 'Gpt total tokens count'})
    @Column({type: DataType.INTEGER, allowNull: false})
    totalTokens: number;
    
    @ApiProperty({example: "RequestType.REQUEST", description: 'Request type'})
    @Column({ type: DataType.ENUM(...Object.values(RequestType)) })
    requestType: RequestType;
    
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW, allowNull: false })
    createdAt: Date
    
    @ForeignKey(() => Promt)
    @Column({type: DataType.INTEGER})
    promtId: number

    @BelongsTo(() => Promt)
    promt: Promt
    
    
    // history
    @ForeignKey(() => GeneratedResponse)
    @Column({type: DataType.INTEGER})
    baseResponseId: number

    @BelongsTo(() => GeneratedResponse)
    baseResponse: GeneratedResponse

    @HasMany(() => GeneratedResponse)
    historyResponses: GeneratedResponse[]
}