import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClauseModule } from "../clause/clause.module";
import { DocumentModule } from "../document/document.module";
import { ArticleController } from "./article.controller";
import { Article } from "./article.entity";
import { ArticleService } from "./article.service";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Article]),
        DocumentModule,
        ClauseModule,
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule {

}