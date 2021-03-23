import { Controller, Get, Post, Req, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from './model/request.model';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(new ValidationPipe())
  @Post("preference")
  async handlePreference(@Body("request") request:Request){
    console.log(request);

    return this.appService.handlePreferenceRequest(request);
  }
}
