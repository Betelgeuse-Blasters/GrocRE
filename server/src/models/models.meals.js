import { db } from "../utils/db.server.js";

class Meals {

  constructor() {}

  async get(userId, mealId) {
    const where = {};
    if (userId) where.userId = userId;
    if (mealId) where.id = mealId;
    const config = { where: where };

    return db.Recipe.findMany(config)
      .then((response) => response)
      .catch((err) => {
        console.log('getMealError', err);
        return [];
      })
  }

  async create(data) {
    return db.Recipe.create({data: data})
      .then((response) => response)
      .catch((err) => {
        console.log('createMealError', err);
        return [];
      })
  }

  async update(data) {
    const where = { id: data.id };

    return db.Recipe.update({where: where, data: data})
      .then((response) => {console.log(response); return response})
      .catch((err) => {
        console.log('updateMealError', err);
        return [];
      })
  }

  async delete(mealId) {
    return db.Recipe.delete({where: {id: mealId}})
      .then((response) => response)
      .catch((err) => {
        console.log('deleteMealError', err);
        return [];
      })
  }

}

export default new Meals();