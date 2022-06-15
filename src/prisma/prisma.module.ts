import { Global, Module } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Global()
@Module({
    providers: [PrismaService],
    // Allow to use from other modules
    exports: [PrismaService]
})
export class PrismaModule {}