import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PointModule } from "../point/point.module";
import { ClauseController } from "./clause.controller";
import { Clause } from "./clause.entity";
import { ClauseService } from "./clause.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Clause]),
        PointModule
    ],
    controllers: [ClauseController],
    providers: [ClauseService],
    exports: [ClauseService]
})
export class ClauseModule {

}