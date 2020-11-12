import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./users.entity";
import { Languages } from "./languages.entity";
import { Categories } from "./categories.entity";

@Entity()
export class Snippets
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    userId?: number;

    @Column({ length: 255 })
    name?: string;

    @Column()
    snippet: string;

    @Column()
    description?: string;

    @Column("tinyint")
    private: number;

    @Column("int")
    categoryId?: number;

    @Column("int")
    languageId?: number;

    @Column("decimal")
    rating?: number;

    @Column("datetime", {select: true})
    createdAt?: Date;

    @Column("datetime", {select: true})
    changedAt?: Date;

    @Column("datetime", {select: false})
    deletedAt?: Date;

    @ManyToOne(type => Categories, category => category.snippets)
    category: Categories;

    @ManyToOne(type => Languages, language => language.snippets)
    language: Languages;

    @ManyToOne(type => Users, user => user.snippets)
    user: Users;
}
