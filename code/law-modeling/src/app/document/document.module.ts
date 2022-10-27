import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { readFile } from "fs";
import { DocumentController } from "./document.controller";
import { Document } from "./document.entity";
import { DocumentService } from "./document.service";
import { CreateDocumentDTO } from "./dto/create-document.dto";

@Module({
    imports: [TypeOrmModule.forFeature([Document])],
    controllers: [DocumentController],
    providers: [DocumentService],
    exports: [DocumentService]

})
export class DocumentModule { }