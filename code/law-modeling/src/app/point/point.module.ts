import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PointController } from "./point.controller";
import { Point } from "./point.entity";
import { PointService } from "./point.service";

@Module({
    imports: [TypeOrmModule.forFeature([Point])],
    controllers: [PointController],
    providers: [PointService],
    exports: [PointService]
})
export class PointModule {

}