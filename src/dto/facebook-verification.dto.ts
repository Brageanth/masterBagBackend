export class FacebookVerificationDto {
  'hub.mode': string;
  'hub.verify_token': string;
  'hub.challenge': string;
}
