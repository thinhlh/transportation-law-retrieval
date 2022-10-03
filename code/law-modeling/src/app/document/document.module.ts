import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentController } from "./document.controller";
import { Document } from "./document.entity";
import { DocumentService } from "./document.service";

@Module({
    imports: [TypeOrmModule.forFeature([Document])],
    controllers: [DocumentController],
    providers: [DocumentService],
    exports: [DocumentService]

})
export class DocumentModule {

}