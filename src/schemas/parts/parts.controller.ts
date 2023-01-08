import { Controller, Post, Body,  Get, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { ValidationPipe } from "src/customPipes/validation.pipe";
import { Part } from "./Part";
import { CreatePartDto } from "./parts.service";
import { PartsService } from "./parts.service";

@Controller('part')
export class PartController{
    constructor(private partService: PartsService){

    }


    
    @Post('create')
    create(@Body(new ValidationPipe()) dto: CreatePartDto): Promise<Part>{
        
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
    @UseGuards(JwtGuard)
    @Get('get')
    get(){
        return this.partService.getAll();
    }
}