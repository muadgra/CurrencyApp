import { Controller, Post, Body, ParseIntPipe, Get, UseInterceptors, CacheInterceptor, CacheTTL } from "@nestjs/common";
import { Part } from "./Part";
import { CreatePartDto } from "./parts.service";
import { PartsService } from "./parts.service";

@Controller('part')
export class PartController{
    constructor(private partService: PartsService){

    }


    @Post('create')
    signup(@Body() dto: CreatePartDto): Promise<Part>{
        console.log(dto);
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