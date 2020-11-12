import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comingsoon
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    emailaddress: string;

}
