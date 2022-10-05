import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "../article/article.entity";
import { PointService } from "../point/point.service";
import { Clause } from "./clause.entity";
import { CreateClauseDTO } from "./dto/create-clause.dto";

@Injectable()
export class ClauseService {

    constructor(
        @InjectRepository(Clause) private readonly clauseRepository: Repository<Clause>,
        private readonly pointService: PointService,
    ) { }

    createClause(createClauseDTO: CreateClauseDTO, article: Article): Promise<Clause> {
        const clause = this.clauseRepository.create({
            ...createClauseDTO,
            id: `${createClauseDTO.index}|${article.index}|${article.document.code}`,
            article: article
        })

        return this.clauseRepository.save(createClauseDTO)
    }

    async createClauses(createClauseDTOs: CreateClauseDTO[], article: Article): Promise<Clause[]> {
        var clauses = this
            .clauseRepository
            .create(
                createClauseDTOs.map((createClauseDTO) => {

                    const clause: Clause = ({
                        ...createClauseDTO,
                        id: `${createClauseDTO.index}|${article.index}|${article.document.code}`,
                        article: article,
                    })

                    this.pointService.createPoints(createClauseDTO.points, clause)

                    return null
                })
            )

        clauses = await this.clauseRepository.save(clauses)

        clauses.forEach((clause) => { })
    }


}