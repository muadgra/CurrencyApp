import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "src/types/DTOs";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        //generate password

        try {
            const hash = await argon.hash(dto.password);

            //save the user
            const user = await this.prisma.userInformation.create({
                data: {
                    userName: dto.userName,
                    hash
                }
            });


            return { msg: 'Signed up', user: user }
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credential is taken');
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {
        const userName = dto.userName
        const user = await this.prisma.userInformation.findFirst({ where: { userName } });

        if(!user){
            throw new ForbiddenException('Credentials not found.');
        }

        const pwMatches = await argon.verify(user.hash, dto.password);
        if(!pwMatches){
            throw new ForbiddenException('Wrong password.');
        }
        return { msg: 'Signed in' }
    }
}