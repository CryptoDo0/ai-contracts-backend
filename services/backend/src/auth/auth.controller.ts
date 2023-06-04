import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from './auth.service';

@ApiTags("Authorization")
@Controller('api/v1/auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Service login'})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Service registration'})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
