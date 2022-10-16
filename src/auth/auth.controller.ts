import { Controller, Post, Body, ParseIntPipe } from "@nestjs/common";
import { AuthDto } from "src/types/DTOs";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){

    }

    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log(dto);
        return this.authService.signup(dto);
    }
    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto);
    }
}