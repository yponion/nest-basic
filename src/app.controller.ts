import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Query,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Ip } from "./decorators/ip.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(@Ip() ip: string): string {
    // this.logger.log(ip);
    // this.logger.debug(ip);
    // this.logger.error(ip);
    // this.logger.verbose(ip);
    // this.logger.warn(ip);

    // throw new HttpException("NotFound", HttpStatus.NOT_FOUND);

    console.log(ip);
    return this.appService.getHello();
  }

  // @Get('name/:name')
  // getName(@Param('name') name: string): string {
  //   return `${name} hello`;
  // }

  @Get("name")
  getName(@Query("name") name: string): string {
    return `${name} hello`;
  }
}
