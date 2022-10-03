import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Document {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    title: string

    @Column({ unique: true })
    code: string
}
