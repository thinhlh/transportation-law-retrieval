import { CreatePointDTO } from "src/app/point/dto/create-point.dto"

export class CreateClauseDTO {
    index: number
    content: string
    points: CreatePointDTO[] = []
}