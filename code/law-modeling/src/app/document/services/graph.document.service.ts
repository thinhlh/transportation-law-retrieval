import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { CreateDocumentDTO } from "../dto/create-document.dto";

@Injectable()
export class GraphDocumentService {
    constructor(private readonly neo4jService: Neo4jService) { }

    async createDocument(createDocumentDTO: CreateDocumentDTO) {
        await this.neo4jService.write("MERGE (document: Document {title: $title, code: $code})", {
            title: createDocumentDTO.title,
            code: createDocumentDTO.code
        },);
    }
}