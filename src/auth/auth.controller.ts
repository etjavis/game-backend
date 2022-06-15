import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto, SignInDto } from "./dto"

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: SignUpDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    @HttpCode(200)
    async signin(@Body() dto: SignInDto) {
        return this.authService.signin(dto)
    }
}