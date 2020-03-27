import { Express } from 'express';
export default class Emoji {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
    this.addEmoji();
    this.deleteEmoji();
  }

  private addEmoji() {
    this.app.post('/emoji', async (req, res) => {
      
    })
  }

  private deleteEmoji() {

  }
}