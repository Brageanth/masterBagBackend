import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  addRecordMonday(boardId: string, data: any) {
    const query = `mutation { create_item (board_id: ${boardId},  item_name: "${data.name}") { id }}`;

    this.httpService
      .request({
        method: 'post',
        url: 'https://api.monday.com/v2',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.MONDAY_API_TOKEN,
        },
        data: JSON.stringify({
          query: query,
        }),
      })
      .subscribe();
  }

  getFacebookUser(id: string): any {
    return lastValueFrom(
      this.httpService.request({
        method: 'get',
        url: `https://graph.facebook.com/${id}?fields=name&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
      }),
    );
  }

  facebookMessages(entry: Array<any>): string {
    entry.forEach((pEntry: any) =>
      pEntry.messaging.map((message: any) => {
        //const userName = this.getFacebookUser(message.sender.id);
        this.addRecordMonday('1529753026', { name: message.sender.id });
      }),
    );
    return 'EVENT_RECEIVED';
  }
}
