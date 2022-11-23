import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { readFile } from "fs";
import { Neo4jModule } from "nest-neo4j/dist";
import { doc } from "prettier";
import { ArticleModule } from "./article/article.module";
import { RDBArticleService } from "./article/services/rdb.article.service";
import { CreateArticleDto } from "./article/dto/create-article.dto";
import { ClauseModule } from "./clause/clause.module";
import { DocumentModule } from "./document/document.module";
import { CreateDocumentDTO } from "./document/dto/create-document.dto";
import { GraphDocumentService } from "./document/services/graph.document.service";
import { RDBDocumentService } from "./document/services/rdb.document.service";
import { PointModule } from "./point/point.module";
import { QueryModule } from "./query/query.module";
import { GraphArticleService } from "./article/services/graph.article.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/dev.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true,
    }),
    Neo4jModule.forRoot({
      scheme: "bolt",
      host: process.env.GRAPH_HOST,
      port: process.env.GRAPH_PORT,
      database: process.env.GRAPH_DB,
      username: process.env.GRAPH_USER,
      password: process.env.GRAPH_PASSWORD,
    }),
    ArticleModule,
    ClauseModule,
    DocumentModule,
    PointModule,
    QueryModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly documentService: RDBDocumentService,
    private readonly graphDocumentService: GraphDocumentService,
    private readonly articleService: RDBArticleService,
    private readonly graphArticleService: GraphArticleService,
  ) { }

  async onApplicationBootstrap() {
    readFile('./src/data/documents.json', 'utf-8', async (err, data) => {
      const documents: CreateDocumentDTO[] = JSON.parse(data)
      documents.forEach(async (document) => {
        await this.graphDocumentService.createDocument(document)
        await this.documentService.createDocument(document)
      })

      readFile('./src/data/articles.json', 'utf-8', (err, data) => {
        const articles: CreateArticleDto[] = JSON.parse(data)

        articles.forEach(async (article) => {
          await this.graphArticleService.createArticle(article)
          await this.articleService.createArticle(article)
        })
      })
    })


    // this.documentService.createDocument()
  }
}
