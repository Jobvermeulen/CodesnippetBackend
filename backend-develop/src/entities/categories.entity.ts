import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Snippets } from "./snippets.entity";

@Entity()
export class Categories
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    name: string;

    @Column("datetime", {select: false})
    deletedAt?: Date;

    @OneToMany(type => Snippets, snippet => snippet.category)
    snippets: Snippets[];
}
