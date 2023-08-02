import React from 'react';
import NavBar from "../../Components/NavBar";
// import EditMeals from "./Meals/EditMeals";
import Meals from './Meals';
import NavMenu from './Menu';
import MealPlan2 from './MealPlan/MealPlan.jsx';
// import MealCard from "../Social/components/MealCard";

export default function MealPlan() {
  const [focused, setFocused] = React.useState({});

  return (
    <>
      <div> <NavBar /> </div>
      <div className="flex">
        <div className="flex-none">
          <NavMenu setFocused={setFocused}/>
        </div>
        <div className="flex-1">
          {/*<Meals />*/}
          <MealPlan2 meal={focused}/>
  
        
        </div>
      </div>
    </>
  );
}

// import { Card } from 'antd';
// export default function MealPlan() {

//   //
//   // meals { id:  }
//   // meal_photos { meal_id: ..., photo: base64 || url }
//   // meal_plan { id: ..., name: ... }
//   // meal_plan_meta { likes & dislikes }
//   // meal_plan_comments { comment... }
//   // meal_meal_plan_lookup { meal_id: ..., meal_plan_id: ... }
//   //
//   // name
//   // likes & dislikes
//   // comments
//   // meal image
//   let nutrtionlInfo = [
//     {

//     }
//   ];
//   let steps = [
//     "Preheat the grill or stovetop pan over medium-high heat.",
//     "Form the ground beef into 4 equal-sized patties.",
//     "Cook the bacon in a separate pan until crispy, then set aside.",
//     "Grill the burger patties for about 4-5 minutes per side or until desired doneness.",
//     "During the last minute of cooking, add a slice of cheese to each patty and let it melt.",
//     "Toast the burger buns lightly on the grill.",
//     "Assemble the burgers by placing a lettuce leaf on the bottom bun, followed by the cooked patty with melted cheese.",
//     "Top the patty with bacon, tomato slices, and onion slices.",
//     "Spread ketchup, mustard, and mayonnaise on the top bun, then place it on top of the burger.",
//     "Serve the cheese burgers with bacon and enjoy!"
//   ];

//   let imgStyle = {
//     width: '150px',
//     height: '150px',
//     background: `url("https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg")`,
//     "background-repeat": "no-repeat",
//     "background-size": "cover"
//   }

//   return (
//     <div>
//       <NavBar />
//       <Card>
//         <div style={{float:'left', marginRight:'16px'}}>
//           <div style={imgStyle}></div>

//         </div>
//         <div style={{height: '150px'}}>
//           <h3>Cheesieburger</h3>
//           <div>
//             <span> Recipe name </span>
//             <sm><span>26 Recipes Available</span></sm>
//           </div>
//           <div>
//             <span> Username </span>
//             <span> New Created Date </span>
//           </div>
//         </div>
//       </Card>

//       <div>
//       {steps.map((e, i) => {
//             return <p key={{i}}>{`${i + 1}. ${e}`}</p>
//           })}
//       </div>
//     </div>
//   );
// }

// -------- garbage pile

// <img style={{width:'150px', height:'150px'}}src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg"></img>
