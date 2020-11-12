import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UpdateUser
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({length: 255})
    fullName?: string;
    
    @Column({length: 255})
    username?: string;

    @Column({length: 255})
    email?: string;

    @Column({length: 255})
    password?: string;

    @Column()
    countryId?: number;

    @Column()
    roleId?: number;

    @Column("datetime", {select: false})
    createdAt?: Date;

    @Column("datetime", {select: false})
    deletedAt?: Date;

}
