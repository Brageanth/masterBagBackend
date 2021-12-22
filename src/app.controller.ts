import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FacebookMessageDto, FacebookVerificationDto } from './dto';

@Controller('webhooks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('facebookMessages')
  facebookMessagesWebhook(@Body() body: FacebookMessageDto): string {
    if (body?.object === 'page') {
      return this.appService.facebookMessages(body.entry);
    }
    throw new HttpException('', HttpStatus.NOT_FOUND);
  }

  @Get('facebookMessages')
  facebookMessagesWebhookGet(@Query() query: FacebookVerificationDto): string {
    if (query && query['hub.verify_token'] === 'masterBagVerification') {
      return query['hub.challenge'];
    }
    throw new HttpException('', HttpStatus.NOT_FOUND);
  }

  @Get()
  testDomain(): string {
    return 'Backend Masterbag corriendo';
  }
}
