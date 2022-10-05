import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Article } from "../article/article.entity"

@Entity()
export class Clause {
    @PrimaryColumn()
    id: string

    @Column()
    index: number

    @Column()
    content: string

    @ManyToOne(() => Article)
    article: Article
}