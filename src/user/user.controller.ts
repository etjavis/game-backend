import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { JwtStrategy } from "src/auth/strategy";

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user
    }
}