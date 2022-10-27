import { HttpModule } from "@nestjs/axios";
import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { readFile } from "fs";
import { ClauseModule } from "../clause/clause.module";
import { DocumentModule } from "../document/document.module";
import { ArticleController } from "./article.controller";
import { Article } from "./article.entity";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Article]),
        DocumentModule,
        ClauseModule,
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService]
})
export class ArticleModule { }