import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('getText')
  getHello(): string {
    // return this.appService.getHello();
    return "Text Text";
  }
}