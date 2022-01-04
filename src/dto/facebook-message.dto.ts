class EntryFacebookMessage {
  id: string;
  time: number;
  messaging: Array<any>;
}

export class FacebookMessageDto {
  object: string;
  entry: Array<EntryFacebookMessage>;
}
