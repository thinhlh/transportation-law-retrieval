import { CacheModule, CACHE_MANAGER, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "./article/article.module";
import { ClauseModule } from "./clause/clause.module";
import { DocumentModule } from "./document/document.module";
import { PointModule } from "./point/point.module";
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      ttl: 30,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true,
    }),
    DocumentModule, ArticleModule, ClauseModule, PointModule
  ],
})
export class AppModule { }
