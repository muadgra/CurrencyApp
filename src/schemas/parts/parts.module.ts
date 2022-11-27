import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Part, PartSchema } from "./Part";
import { PartsService } from "./parts.service";
import { PartController } from "./parts.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Part.name, schema: PartSchema }])
    ],
    controllers: [
        PartController
    ],
    providers: [PartsService],
    exports: [PartsService]

})
export class PartsModule { }