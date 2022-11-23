import { Injectable } from "@nestjs/common"
import { Neo4jService } from "nest-neo4j/dist"
import { GraphPointService } from "src/app/point/services/graph.point.service";
import { Clause } from "../clause.entity"
import { CreateClauseDTO } from "../dto/create-clause.dto"

@Injectable()
export class GraphClauseService {

    constructor(
        private readonly neo4jService: Neo4jService,
        private readonly graphPointService: GraphPointService,
    ) { }

    async createClause(createClauseDTO: CreateClauseDTO, articleId: number): Promise<any> {
        const clauseCreateResult = await this.neo4jService.write(
            `
            MATCH (article: Article)
            WHERE id(article) = $articleId
            MERGE (clause: Clause {content: $content, index: $index}) <-[:HAS]-(article)
            RETURN id(clause) as id
            `,
            {
                articleId: articleId,
                content: createClauseDTO.content,
                index: createClauseDTO.index,
            });



        clauseCreateResult.records.forEach((clauseResult) => {
            createClauseDTO.points.forEach(async (point) => {
                await this.graphPointService.createPoint(point, clauseResult.get('id').low)
            })
        });
    };
}