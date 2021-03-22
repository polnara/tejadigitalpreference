import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from './model/request.model';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/preference")
  handlePreference(@Body() request:Request){
    return request;
  }
}
