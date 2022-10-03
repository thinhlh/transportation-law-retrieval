import { Body, Controller, Get, Post } from "@nestjs/common";
import { Document } from "./document.entity";
import { DocumentService } from "./document.service";
import { CreateDocumentDTO } from "./dto/create-document.dto";

@Controller()
export class DocumentController {

    constructor(private readonly documentService: DocumentService) { }

    @Get("/documents")
    async getDocuments(): Promise<Document[]> {
        return this.documentService.getDocuments();
    }

    @Post("/document")
    async createDocument(@Body() createDocumentDTO: CreateDocumentDTO): Promise<Document> {
        return this.documentService.createDocument(createDocumentDTO)
    }
} 