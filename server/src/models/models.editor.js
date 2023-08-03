import { db } from "../utils/db.server.js";

/**
 * Schema:
 * id, name, description, user, userId, recipes
 * posts, MealPlanToRecipe
 */
class Model {

//   constructor() {}

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
        return check.length > 0 ? {
          ...check[0].user,
          loggedIn : true
      } : {
        loggedIn : false
      };
    }catch (error){
        console.log(error);
    }
    return {
        loggedIn : false
    };
  }
}



// export default new Model();