import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentService } from "../document/document.service";
import { Article } from "./article.entity";
import { CreateArticleDto } from "./dto/create-article.dto";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        private readonly documentService: DocumentService,
    ) { }
    async getArticles(): Promise<Article[]> {
        return await this.articleRepository.find()
    }

    async createArticle(createArtcleDTO: CreateArticleDto): Promise<Article> {
        const document = await this.documentService.getDocumentById(createArtcleDTO.documentId)
        const article = this.articleRepository.create({ ...createArtcleDTO, document: document })
        return await this.articleRepository.save(article)

    }
}