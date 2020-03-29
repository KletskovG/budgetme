import {Express, Response} from 'express';
import Logger from '../../core/Logger';
import { User, IUser } from '../../../models/User/User';
import ICategory from '../../../models/User/ICategory';

export class userCategories {
  private app: Express = null;
  private logger: Logger = new Logger();

  constructor(app: Express) {
    this.app = app;
    this.getCategories();
    this.addCategory();
    this.updateCategory();
    this.deleteCategory();
  }

  private addCategory() {
    this.app.post('/category', async  (req, res) => {
      const user = await User.findById(req.body.id);
      if (!!user) {
        const { categories } = user;
        const requestCategory: ICategory = req.body.category as ICategory;
        if (this.validateCategory(requestCategory, user)) {
          categories.push(req.body.category);
          user.save();
          res.status(200).send(JSON.stringify(req.body.category));
          this.logger.log(`Update categories for ${req.body.id} --- ${req.body.category}`, 'info');
        } else {
          res.statusMessage = 'Data is invalid';
          res.status(400).send();
          this.logger.log(`/category (addCategory) /// invalid data -- id: ${req.body.id} -- cat: ${req.body.category}`, 'error');
        }
      } else {
        this.cantFindUser(res);
      }
    });
  }

  private deleteCategory() {
    this.app.delete('/category', async (req, res) => {
      const user = await User.findById(req.body.id);
      const categoryId = req.body.categoryId;
      if (!!user) {
        const category = user.categories.find(
          element => `${element._id}` === `${categoryId}`
        );
        const index = user.categories.indexOf(category);
        if (index === 0) {
          user.categories.shift();
        } else {
          user.categories.splice(1, index);
        }
        user.save();
        res.status(200).send(JSON.stringify(user.categories));
        this.logger.log(`Delete category ${JSON.stringify(category)} for ${req.body.id}`, 'info');
      } else {
        this.cantFindUser(res);
      }
    });
  }

  private updateCategory() {
    this.app.put('/category', async (req, res) => {
      const user = await User.findById(req.body.id);
      if (!!user) {
        const category = user.categories.find(
          element => `${element._id}` === `${req.body.categoryId}`
        );
        for (const key in req.body.update) {
          if (req.body.update.hasOwnProperty(key)) {
            category[key] = req.body.update[key];
          }
        }
        user.save();
        res.status(200).send(JSON.stringify(user.categories));
        this.logger.log(`Update user categories: ${user._id} --- ${JSON.stringify(user.categories)}`, 'info');
      } else {
        this.cantFindUser(res);
      }
    });
  }

  private getCategories() {
    this.app.get('/category/:id', async (req ,res) => {
      const user = await User.findById(req.params.id);
      if (!!user) {
        res.status(200).send(JSON.stringify(user.categories));
        this.logger.log(`Send user categories to ${user.email}`, 'info');
      } else {
        this.cantFindUser(res);
      }
    })
  }

  private validateCategory(category: ICategory, user: IUser): boolean {
    const catStr = `${category.emoji} ${category.name}`;
    const isCategoryEmpty = category.name.trim().length > 0;
    let isCategoryUnique = true;
    user.categories.forEach(element => {
      const elementStr = `${element.emoji} ${element.name}`;
      if (elementStr === catStr) {
        isCategoryUnique = false;
      }
    })
    const rules = [isCategoryEmpty, isCategoryUnique];
    let isValid = true;
    rules.forEach((rule, index) => {
      if (rule === false) {
        isValid = false;
      }
    })

    return isValid;
  } 

  private cantFindUser(res: Response){
    res.statusMessage = 'Cant find this user ';
    res.status(404).send();
    this.logger.log(`Cant find user /// getCategories (/category)`, 'error');
  }
}