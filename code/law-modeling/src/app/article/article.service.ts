import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
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
        @Inject(CACHE_MANAGER)
        private cacheService: Cache,
    ) { }

    private readonly ARTICLE_CACHE_KEY = 'articles'

    async getArticleNoReplica(): Promise<Article[]> {
        return await this.articleRepository.find({
            relations: ["clauses", "clauses.points"],
        });
    }

    async getArticles(): Promise<Article[]> {
        const cachedData = await this.cacheService.get<Article[]>(this.ARTICLE_CACHE_KEY)

        if (cachedData) {
            return cachedData;
        }

        const articles = await this.articleRepository.find({
            relations: ["clauses", "clauses.points"],
        });

        await this.cacheService.set(this.ARTICLE_CACHE_KEY, articles)

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