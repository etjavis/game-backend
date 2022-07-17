import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class EditUserDto {
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsNotEmpty()
    @IsOptional()
    password?: string;
}