import { Controller, Get } from '@nestjs/common';

@Controller('system')
export class SystemController {

  @Get('health-check')
  healthCheck(): boolean {
    return true;
  }
}
