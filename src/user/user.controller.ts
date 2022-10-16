import { Body, Controller, Get, Post } from "@nestjs/common";
import CreateUserDTO from "src/types/DTOs/CreateUserDTO";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Post('create')
    createUsers(@Body() createUserDto: CreateUserDTO) { 
        return this.userService.createUser(createUserDto); 
    }
}