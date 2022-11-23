import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { GraphClauseService } from "src/app/clause/services/graph.clause.service";
import { Article } from "../article.entity";
import { CreateArticleDto } from "../dto/create-article.dto";

@Injectable()
export class GraphArticleService {

    constructor(
        private readonly neo4jService: Neo4jService,
        private readonly graphClauseService: GraphClauseService
    ) { }

    async createArticle(createArtcleDTO: CreateArticleDto): Promise<any> {
        const result = await this.neo4jService.write(`
        MATCH(document: Document {code: $documentId})
        MERGE (article: Article {index: $index, title: $title, content: $content}) <-[:HAS]-(document)
        RETURN id(article) as id`,
            {
                title: createArtcleDTO.title,
                index: createArtcleDTO.index,
                content: createArtcleDTO.content,
                documentId: createArtcleDTO.documentId
            })

        result.records.forEach((record => {
            createArtcleDTO.clauses.forEach(async (clause) => {
                await this.graphClauseService.createClause(clause, record.get('id').low)
            });
        }))
    }
}