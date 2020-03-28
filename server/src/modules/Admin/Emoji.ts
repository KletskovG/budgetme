import { Express } from 'express';
import {Emoji, IEmojiBase} from '../../../models/Admin/Emoji';
export class EmojiRoute {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
    this.addEmoji();
    this.deleteEmoji();
    this.getEmojis();
  }

  private getEmojis() {
    this.app.get('/emoji', async (req, res) => {
      const emoji = await Emoji.find({})
      res.send(JSON.stringify(emoji));
    });
  }

  private addEmoji() {
    this.app.post('/emoji', async (req, res) => {
      const emojis = await Emoji.find({});
      const index = emojis.length + 1;
      const emoji: IEmojiBase = {
        emoji: encodeURI(req.body.emoji),
        isExpense: req.body.isExpense,
        index,
      };
      Emoji.create(emoji)
        .then((createdEmoji) => {
          emojis.push(createdEmoji);
          res.send(JSON.stringify(emojis));
        });
    });
  }

  private deleteEmoji() {
    this.app.delete('/emoji', async (req, res) => {
      Emoji.findByIdAndDelete(req.body.id)
        .then(async () => {
          const emoji = await Emoji.find({});
          res.send(JSON.stringify(emoji));
        })
    });
  }
}