import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Clause {
    @PrimaryColumn()
    id: string

    @Column()
    content: string
}