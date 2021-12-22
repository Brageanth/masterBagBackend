import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  addRecordMonday(boardId: string) {
    const query = `mutation { create_item (board_id: ${boardId},  item_name: "new item2") { id }}`;

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

  facebookMessages(entry: Array<any>): string {
    entry.forEach((pEntry: any) => {
      console.log(pEntry);
      return pEntry.messaging.map((message: any) => {
        console.log('message faceboko', message);
        this.addRecordMonday('1529753026');
      });
    });
    return 'EVENT_RECEIVED';
  }
}
