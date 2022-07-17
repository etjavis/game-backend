import { UnprocessableEntityException, Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from "../prisma/prisma.service";
import { SignUpDto, SignInDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}
    
    /**
     * Create a new user
     * 
     * @param dto 
     * @returns 
     */
    async signup(dto: SignUpDto) {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hash,
                }
            })

            delete user.password

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new UnprocessableEntityException('Credentials taken')
                }
            }
            throw error
        }
    }

    /**
     * Sign an user
     * 
     * @param dto 
     * @returns 
     */
    async signin(dto: SignInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user || !await argon.verify(user.password, dto.password)) {
            throw new ForbiddenException('Credentials incorrect')
        }

        return this.signToken(user);
    }

    /**
     * Creates a new token for an user
     * 
     * @param user 
     * @returns 
     */
    async signToken(user: User): Promise<{ accessToken: string }> {
        const accessToken = await this.jwt.signAsync({
            id: user.id,
            email: user.email,
            name: user.name
        }, {
            expiresIn: this.config.get('ACCESS_TOKEN_TTL'),
            secret: this.config.get('JWT_SECRET')
        })

        return { accessToken }
    }
}