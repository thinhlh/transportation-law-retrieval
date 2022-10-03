import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClauseController } from "./clause.controller";
import { Clause } from "./clause.entity";
import { ClauseService } from "./clause.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Clause])
    ],
    controllers: [ClauseController],
    providers: [ClauseService]
})
export class ClauseModule {

}