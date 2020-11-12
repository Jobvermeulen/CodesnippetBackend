import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class UpdateSnippet
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column("int")
    userId?: number;

    @Column({ length: 255 })
    name?: string;

    @Column()
    snippet?: string;

    @Column()
    description?: string;

    @Column("tinyint")
    private?: number;

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
}
