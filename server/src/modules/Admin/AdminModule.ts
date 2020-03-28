import { Express } from 'express';
import { EmojiRoute } from './Emoji';

export class AdminModule {
  private app: Express = null;

  constructor(app: Express) {
    this.app = app;
    const emoji = new EmojiRoute(app);
  }
}
