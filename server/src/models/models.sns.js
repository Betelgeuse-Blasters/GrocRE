import { db } from "../utils/db.server.js";


export async function getAllPosts() {
  return await db.post.findMany();
}

export async function getUser(id) {
  id = Number(id);
  return await db.user.findUnique({
    where: {
      id: id
    }
  });
}
export async function getRecipe(id) {
  id = Number(id);
  return await db.recipe.findUnique({
    where: {
      id: id
    }
  });
}