// import Model from "../models/models.editor.js";
// import { validationResult } from "express-validator";

// const userInfo = (req, res) => {
//   console.log('hit', req.cookies);
//     if (!req.cookies || !req.cookies.session) {
//       res.status(401).send('bummer')
//       // res.sendStatus(401);
//     }
//     const session = req.cookies.session || '';
//     Model.userInfo(session)
//       .then((response) => {
//         response.loggedIn ? res.status(200).json(response) : res.status(401).send('Go away');
//       })
// };

// const mealPlans = (req, res) => {
//   const session = req.cookies.session;
//   console.log('meal plans', session)
//   if (!session) {
//     res.status(400).send('meal plans - no session');
//     return;
//   }

//   return Model.userInfo(session)
//     .then((response) => {
//       // console.log('user info response'. response)
//       let userId = response.userId;
//       // console.log('user id', userId)
//       return Model.mealPlans(userId);
//     })
//     .then((response) => {
//       // console.log('db response', response);
//       res.status(200).send(response);
//       return;
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send('meal plans - log in first')
//     })

// };

// const postMealPlan = (req, res) => {
//   console.log('post mp', req.body)
//   let name = req.body.name;
//   let description = req.body.description;
//   let session = req.sesssion;

//   return Model.userInfo(session)
//     .then((response) => {
//       let userId = response.userId;
//       return Model.addMealPlan(userId, name, description)
//     })
//     .then((response) => {res.status(200).send(response)})
//     .catch((err) => res.status(401).send(err))

// };

// const saveDummyData = (req, res) => {
//   Model.saveDummyData();
//   res.status(200).send('why not');
// }

// const Controller = {
//   userInfo,
//   mealPlans,
//   postMealPlan,
//   saveDummyData
// }

// export default Controller;