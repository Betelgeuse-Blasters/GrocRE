// import { db } from "../utils/db.server.js";
// import { saveRecipe } from "./models.ai.js";
// class Model {

//   constructor() {}

//   async userInfo(session) {
//     try{
//         const check = await db.sessions.findMany({
//             where:{
//                 sessionHash: session
//             },
//             include:{
//                 user:true
//             }
//         });

//         let response = {
//             loggedIn : true,
//             name : check[0].user.name,
//             userId : check[0].user.id
//         }
//         return response;
//     }catch (error){
//         console.log(error);
//     }
//     return {
//         loggedIn : false
//     };
//   }

//   async mealPlans(userId) {
//     try{

//         const getMeals = await db.MealPlan.findMany({
//             where:{
//                userId : userId
//             },
//             include:{
//                 recipes : true
//             }
//         });
//         console.log(getMeals);
//         return getMeals;

//     }catch (error){
//         return [];

//     }
//   }

//   async addMealPlan(userId, name, description) {
//     try{
//     const additionResponse = await db.MealPlan.create({
//         data: {
//             userId: userId,
//             name: name,
//             description: description
//         }
//     });
//     return 'ok';
//     }catch(error){
//         console.log('add err', error);
//         return error;
//     }
//   }

//   async saveDummyData() {
//     const dummyData = [
//         {
//           id: 1,
//           recipeName: "Pasta Carbonara",
//           recipeDescription: "A classic Italian pasta dish with eggs, cheese, and pancetta.",
//           recipeSteps: ["Step 1: Cook the pasta", "Step 2: Fry pancetta until crispy", "Step 3: Mix eggs and cheese", "Step 4: Combine everything and serve"],
//           servingSize: 2,
//           nutritionFacts: { calories: 500, fat: 20, protein: 15 },
//           ingredients: ["200g pasta", "100g pancetta", "2 eggs", "50g grated Parmesan cheese"],
//           creatorId: 1,
//         },
//         {
//           id: 2,
//           recipeName: "Chicken Stir Fry",
//           recipeDescription: "A quick and easy stir fry with chicken and vegetables.",
//           recipeSteps: ["Step 1: Marinate chicken with soy sauce", "Step 2: Stir fry chicken and vegetables", "Step 3: Add sauce and cook until heated through"],
//           servingSize: 4,
//           nutritionFacts: { calories: 400, fat: 10, protein: 25 },
//           ingredients: ["500g chicken breast", "1 cup broccoli florets", "1 bell pepper", "3 cloves garlic"],
//           creatorId: 1,
//         },
//         // Add more dummy records here...
//       ];

//       Promise.all(dummyData.map((recipe) => saveRecipe(recipe)))
//       .then((response) => console.log('dummy data save', response))
//       .catch((err) => console.log('dummy data save', err))
//       return 'ok';
//   }

// }



// export default new Model();