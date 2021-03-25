import { Controller, Get, Post, Req, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from './model/request.model';
import { DegitalPreferenceResponse } from './model/digitalPreference/response.model';
import { DigitalPreferencesDetails } from './model/digitalPreference/DigitalPreferencesDetails.model';
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

    return this.appService.handlePreferenceRequest(request);
  }

  @UsePipes(new ValidationPipe())
  @Post("response")
  async handleResponse(@Body("response") response){

    console.log(response);
  }
}
