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
                const clauseCreateResult = await this.neo4jService.write(
                    `
                MATCH (article: Article)
                WHERE id(article) = $articleId
                MERGE (clause: Clause {content: $content, index: $index}) <-[:HAS]-(article)
                RETURN id(clause) as id
                `,
                    {
                        articleId: record.get('id').low,
                        content: clause.content,
                        index: clause.index,
                    });

                clauseCreateResult.records.forEach((clauseResult) => {
                    clause.points.forEach(async (point) => {
                        await this.neo4jService.write(`
                        MATCH (clause: Clause)
                        WHERE id(clause) = $clauseId
                        MERGE (point: Point {content: $content, index: $index}) <-[:HAS]-(clause)
                        `, {
                            clauseId: clauseResult.get('id').low,
                            content: point.content,
                            index: point.index
                        });
                    })
                });
            });
        }))
    }
}