import { Controller, Post, Body, ParseIntPipe, Get } from "@nestjs/common";
import { CreatePartDto } from "./parts.service";
import { PartsService } from "./parts.service";

@Controller('part')
export class PartController{
    constructor(private partService: PartsService){

    }

    @Post('create')
    signup(@Body() dto: CreatePartDto){
        console.log(dto);
        return this.partService.create({
                code: dto.code, 
                name: dto.name, 
                belongsTo: dto.belongsTo, 
                dateOfProduction: dto.dateOfProduction,
                dateOfUpdate: dto.dateOfUpdate,
                location: dto.location
            });
    }
    @Get('get')
    signin(){
        return this.partService.getAll();
    }
}