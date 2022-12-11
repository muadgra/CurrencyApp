import { Controller, Post, Body,  Get } from "@nestjs/common";
import { ValidationPipe } from "src/customPipes/validation.pipe";
import { Part } from "./Part";
import { CreatePartDto } from "./parts.service";
import { PartsService } from "./parts.service";

@Controller('part')
export class PartController{
    constructor(private partService: PartsService){

    }


    @Post('create')
    signup(@Body(new ValidationPipe()) dto: CreatePartDto): Promise<Part>{
        
        return this.partService.create({
                code: undefined,
                name: dto.name, 
                belongsTo: dto.belongsTo, 
                dateOfProduction: dto.dateOfProduction,
                dateOfUpdate: dto.dateOfUpdate,
                location: dto.location
            });
    }
    //@UseInterceptors(CacheInterceptor)
    //@CacheTTL(30)
    @Get('get')
    signin(){
        return this.partService.getAll();
    }
}