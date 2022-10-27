import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { readFile } from "fs";
import { ArticleModule } from "./article/article.module";
import { ArticleService } from "./article/article.service";
import { CreateArticleDto } from "./article/dto/create-article.dto";
import { ClauseModule } from "./clause/clause.module";
import { DocumentModule } from "./document/document.module";
import { DocumentService } from "./document/document.service";
import { PointModule } from "./point/point.module";

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
    ArticleModule,
    ClauseModule,
    DocumentModule,
    PointModule
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly documentService: DocumentService,
    private readonly articleService: ArticleService,
  ) { }

  async onApplicationBootstrap() {
    readFile('./src/data/documents.json', 'utf-8', async (err, data) => {

      const document = JSON.parse(data)
      await this.documentService.createDocument(document)

      readFile('./src/data/articles.json', 'utf-8', (err, data) => {
        const articles: CreateArticleDto[] = JSON.parse(data)

        articles.forEach(async (article) => {
          await this.articleService.createArticle(article)
        })
      })
    })


    // this.documentService.createDocument()
  }
}
