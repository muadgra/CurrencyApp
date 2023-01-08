import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AddTypeDTO } from "./DTOs/addTypeDTO";


@Injectable({})
export class TypeService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async findOne(code: number) {
        const type = this.prisma.typeInformation.findFirst({ where: { code } });
        if (!type) {
            throw new ForbiddenException('Type not found.');
        }
        return type;
    }

    async findAll(){
        console.log("findAll");
        return this.prisma.typeInformation.findMany();
    }

    async addType(dto: AddTypeDTO) {
        console.log("addType");
        try {
            const type = this.prisma.typeInformation.create({
                data: {
                    name: dto.name,
                    generation: dto.generation
                }
            })
        }
        catch(error: any){
            throw error;
        }
    }
}