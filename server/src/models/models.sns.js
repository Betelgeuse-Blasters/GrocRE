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

export async function updateLikes(postid, userid, like) {
  postid = Number(postid);
  userid = Number(userid);
  like = (like === 'true')
  const exists = await db.likesDislikes.findFirst({
    where: {
      postId: postid,
      userId: userid
    }
  })
  if (exists) {
    return await db.likesDislikes.update({
      where: {
        id: exists.id
      },
      data: {
        isLike: like
      }
    })
  } else {
    return await db.likesDislikes.create({
      data: {
        postId: postid,
        userId: userid,
        isLike: like
      }
    })
  }
}

export async function getLikes(postid, boolean) {
  postid = Number(postid);
  const likes = await db.likesDislikes.findMany({
    where: {
      postId: postid,
      isLike: boolean
    }
  })
  return likes;
}

export async function saveRecipe(userid, recipeid) {
  userid = Number(userid)
  recipeid = Number(recipeid)
  const exists = await getSavedRecipe(userid, recipeid)
  if (!exists) {
    await db.userSavedMeals.create({
      data: {
        userId: userid,
        recipeId: recipeid
      }
    })

  }
}

export async function unsaveRecipe(userid, recipeid) {
  console.log('im running')
  userid = Number(userid)
  recipeid = Number(recipeid)
 const result = await getSavedRecipe(userid, recipeid)
  await db.userSavedMeals.delete({
    where: {
      id: result.id
    }
  })
}

export async function getSavedRecipe(userid, recipeid) {
  userid = Number(userid)
  recipeid = Number(recipeid)

  return await db.userSavedMeals.findFirst({
    where: {
      userId: userid,
      recipeId: recipeid
    }
  })
}