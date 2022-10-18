import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { Article } from "./article.entity";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";

@Controller()
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService,
        private readonly httpService: HttpService
    ) {

    }

    @Get("/articles")
    async getArticles(@Req() request: Request): Promise<Article[]> {
        const articles = await this.articleService.getArticleNoReplica();
        this.httpService.get("http://logging:8000/", { data: articles })
        return articles;

        if (process.env.OPTIMIZED === 'false') {
            return this.articleService.getArticleNoReplica();
        } else {
            return this.articleService.getArticles();
        }
    }

    @Post("/article")
    async createArticle(@Body() createArticleDTO: CreateArticleDto): Promise<Article> {
        return this.articleService.createArticle(createArticleDTO)
    }

    @Post("/articles")
    async createArticles(@Body() createArticleDTOs: CreateArticleDto[]): Promise<Article[]> {
        return Promise.all(
            createArticleDTOs
                .map(async (createArticleDTO) => await this.createArticle(createArticleDTO))
        )
    }
}