import { Clause } from "src/app/clause/clause.entity"
import { CreateClauseDTO } from "src/app/clause/dto/create-clause.dto"

export class CreateArticleDto {
    index: number
    title: string
    content: string
    documentId: string
    clauses: CreateClauseDTO[] = []
}