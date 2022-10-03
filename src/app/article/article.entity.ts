import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Document } from "../document/document.entity"

@Entity()
export class Article {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("int")
    index: number

    @Column()
    title: string

    @Column()
    content: string

    @ManyToOne(() => Document)
    document: Document
}
