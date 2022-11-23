import { Injectable } from "@nestjs/common"
import { Neo4jService } from "nest-neo4j/dist"
import { Clause } from "../clause.entity"
import { CreateClauseDTO } from "../dto/create-clause.dto"

@Injectable()
export class GraphClauseService {

    constructor(
        private readonly neo4jService: Neo4jService,
    ) { }

    async createClause(createClauseDTO: CreateClauseDTO): Promise<any> {

    }

}