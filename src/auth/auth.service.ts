import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "src/types/DTOs";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

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

            return this.signToken(user.id, user.userName)
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

        if (!user) {
            throw new ForbiddenException('Credentials not found.');
        }

        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches) {
            throw new ForbiddenException('Wrong password.');
        }
        delete user.hash
        return this.signToken(user.id, user.userName)
    }

    private async signToken(userId: number, email: string): Promise<{access_token: string}>{
        const data = {
            sub: userId,
            email: email
        }

        const token = await this.jwt.signAsync(data, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET'),
        })

        return {
            access_token: token
        }
    }
}