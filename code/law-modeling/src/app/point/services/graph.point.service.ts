import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { CreatePointDTO } from "../dto/create-point.dto";

@Injectable()
export class GraphPointService {

    constructor(private readonly neo4jService: Neo4jService) { }

    async createPoint(createPointDTO: CreatePointDTO, clauseId: number) {
        await this.neo4jService.write(`
                    MATCH (clause: Clause)
                    WHERE id(clause) = $clauseId
                    MERGE (point: Point {content: $content, index: $index}) 
                    MERGE (point)<-[:HAS_POINT]-(clause)
                    `, {
            clauseId: clauseId,
            content: createPointDTO.content,
            index: createPointDTO.index
        });
    }
}