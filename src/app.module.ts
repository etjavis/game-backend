import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SystenModule } from './system/system.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    SystenModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
