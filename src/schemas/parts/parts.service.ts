import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import { Model } from "mongoose";
import { Part, PartDocument } from "./Part";
import { Cache } from 'cache-manager';

@Injectable()
export class PartsService {
    constructor(
        @InjectModel(Part.name) private partModel: Model<PartDocument>,
        @Inject(CACHE_MANAGER) private cacheService: Cache
    ) { }

    async create(part: Part): Promise<Part> {
        console.log(part)
        const createdPart = await new this.partModel(part);
        return await createdPart.save();
    }

    async getAll(): Promise<Part[]>{

        const data =  await this.partModel.find().exec();
        const cachedData = await this.cacheService.get<Part[]>("all");
        
        if(cachedData){
            console.log(Object.keys(cachedData).length)
            console.log(`Getting data from cache!`);
        }
        await this.cacheService.set("all", data, 15000);
        return data;
    }
}

export class CreatePartDto{
    @IsString()
    code: string;
    @IsString()
    name: string;
    @IsString()
    location: string;
    @IsString()
    belongsTo: string;
    dateOfProduction: Date = new Date();
    dateOfUpdate: Date = new Date();

    constructor(){}
}