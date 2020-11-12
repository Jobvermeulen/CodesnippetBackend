import { Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToOne, JoinColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity("userResetPassword")
export class UserResetPassword
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column("int")
    userId?: number;

    @Column("datetime")
    expiresAt?: Date;

    @Column({type: "char", length: 32})
    token?: string;

    @Column("datetime")
    issuedAt?: Date;

    @Column("datetime")
    usedAt?: Date;

    @OneToOne(() => Users)
    @JoinColumn()
    user?: Users;
}
