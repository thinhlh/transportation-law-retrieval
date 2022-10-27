import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClauseService } from "../clause/clause.service";
import { DocumentService } from "../document/document.service";
import { Article } from "./article.entity";
import { CreateArticleDto } from "./dto/create-article.dto";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        private readonly documentService: DocumentService,
        private readonly clauseService: ClauseService,
    ) { }

    async getArticles(): Promise<Article[]> {
        const articles = await this.articleRepository.find({
            relations: ["clauses", "clauses.points"],
        });

        return articles;

    }

    async createArticle(createArtcleDTO: CreateArticleDto): Promise<Article> {
        const document = await this.documentService.getDocumentById(createArtcleDTO.documentId)
        var article = this.articleRepository.create({
            ...createArtcleDTO,
            id: `${createArtcleDTO.index}|${document.id}`,
            document: document
        })
        article = await this.articleRepository.save(article)

        await this.clauseService.createClauses(createArtcleDTO.clauses, article)

        return article
    }
}