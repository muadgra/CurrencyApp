import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeResolver } from "./type.resolver";
import { TypeService } from "./type.service";

@Module({
    imports: [
        JwtModule.register({
            signOptions: { expiresIn: '3600s' }
        }),
        PassportModule,
        
    ],
    providers: [TypeService, TypeResolver],
})
export class TypeModule {

}