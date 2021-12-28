import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { HttpModule } from "src/http/http.module";
import { CatsController } from "./controllers/cats.controller";
import { CoreModule } from "src/core/core.module";
import { CatsService } from "./services/cats.service";
import { LoggerMiddleware } from "src/middleware/logger.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import { Cat } from "./interfaces/cat.interface";
import { CatSchema } from "./schemas/cat.schema";

@Module({
    imports: [
        CoreModule,
        MongooseModule.forFeature([
            {name: Cat.name, schema: CatSchema}
        ]),
    ],
    providers: [CatsService],
    controllers: [CatsController],

    // export CatsSerivce provider
    exports: [CatsService],

})

export class CatsModule implements NestModule {
    async configure(consumer: MiddlewareConsumer) {
        await consumer
        .apply(LoggerMiddleware)
        .forRoutes('cats');
    }
}