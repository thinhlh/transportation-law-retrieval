import { CreatePointDTO } from "../../point/dto/create-point.dto";

export class CreateClauseDTO {
    index: number
    content: string
    points: CreatePointDTO[] = []
}