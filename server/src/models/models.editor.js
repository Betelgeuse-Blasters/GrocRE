import { db } from "../utils/db.server.js";

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
            name : check[0].user.name
        }
        return response;
    }catch (error){
        console.log(error);
    }
    return {
        loggedIn : false
    };
  }

}

export default new Model();