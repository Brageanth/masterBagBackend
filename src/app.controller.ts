import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FacebookMessageDto } from './dto';

@Controller('webhooks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('facebookMessages')
  facebookMessagesWebhook(@Body() body: FacebookMessageDto): string {
    if (body.object === 'page') {
      return this.appService.facebookMessages(body.entry);
    }
    throw new HttpException('', HttpStatus.NOT_FOUND);
  }
}
