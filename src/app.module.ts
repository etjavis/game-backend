import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { SystenModule } from './system/system.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // isGlobal do the same thing like @Global()
    AuthModule,
    PrismaModule,
    SystenModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
