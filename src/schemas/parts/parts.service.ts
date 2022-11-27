import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Part, PartDocument } from "./Part";

@Injectable()
export class PartsService {
    constructor(@InjectModel(Part.name) private partModel: Model<PartDocument>) { }

    async create(part: Part): Promise<Part> {
        console.log(part)
        const createdPart = await new this.partModel(part);
        return await createdPart.save();
    }

    async getAll(): Promise<Part[]>{
        return await this.partModel.find().exec();
    }
}

export class CreatePartDto{
    code: string;
    name: string;
    location: string;
    belongsTo: string;
    dateOfProduction: Date = new Date();
    dateOfUpdate: Date = new Date();

    constructor(){}
}