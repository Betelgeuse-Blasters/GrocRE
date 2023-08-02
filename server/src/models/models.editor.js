import { db } from "../utils/db.server.js";
import { saveRecipe } from "./models.ai.js";
class Model {

  constructor() {}

  async userInfo(session) {
    try{
        const check = await db.sessions.findMany({
            where:{
                sessionHash: session
            },
            include:{
                user:true
            }
        });

        let response = {
            loggedIn : true,
            name : check[0].user.name,
            userId : check[0].user.id
        }
        return response;
    }catch (error){
        console.log(error);
    }
    return {
        loggedIn : false
    };
  }

  async mealPlans(userId) {
    try{

        const getMeals = await db.MealPlan.findMany({
            where:{
               userId : userId
            },
            include:{
                recipes : true
            }
        });
        console.log(getMeals);
        return getMeals;

    }catch (error){
        console.log('meal plans err', error);
        return [];
    }
  }

  async addMealPlan(userId, name, description) {
    try{
    const additionResponse = await db.MealPlan.create({
        data: {
            userId: userId,
            name: name,
            description: description
        }
    });
    return 'ok';
    }catch(error){
        console.log('add err', error);
        return error;
    }
  }

}



export default new Model();