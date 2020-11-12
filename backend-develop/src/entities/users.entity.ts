import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Roles } from "../entities/roles.entity";
import { Snippets } from "./snippets.entity";

@Entity()
export class Users
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    fullName: string;

    @Column({length: 255})
    username: string;

    @Column({length: 255, select: false})
    email: string;

    @Column({length: 255, select: false})
    password: string;

    @Column()
    roleId: number;

    @Column()
    countryId: number;

    @Column("datetime", {select: false})
    createdAt?: Date;

    @Column("datetime", {select: false})
    deletedAt?: Date;

    @OneToOne(type => Roles)
    @JoinColumn()
    role: Roles;

    @OneToMany(type => Snippets, snippet => snippet.user)
    snippets: Snippets[];
}
