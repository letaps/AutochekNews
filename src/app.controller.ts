import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello/:term')
  public sampleRoute(@Param('term') term: string): string {
    return `your term: ${term}`;
  }
}
