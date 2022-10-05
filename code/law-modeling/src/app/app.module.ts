import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "./article/article.module";
import { ClauseModule } from "./clause/clause.module";
import { DocumentModule } from "./document/document.module";
import { PointModule } from "./point/point.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "postgres",
      database: "law_retrieval",
      synchronize: true,
      autoLoadEntities: true,
    }),
    DocumentModule, ArticleModule, ClauseModule, PointModule
  ],

})
export class AppModule { }
