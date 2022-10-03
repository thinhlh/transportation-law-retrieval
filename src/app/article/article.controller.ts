import { Body, Controller, Get, Post } from "@nestjs/common";
import { Article } from "./article.entity";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";

@Controller()
export class ArticleController {

    constructor(private readonly articleService: ArticleService) {

    }

    @Get("/articles")
    async getArticles(): Promise<Article[]> {
        return this.articleService.getArticles()
    }

    @Post("/article")
    async createArticle(@Body() createArticleDTO: CreateArticleDto): Promise<Article> {
        return this.articleService.createArticle(createArticleDTO)
    }
}