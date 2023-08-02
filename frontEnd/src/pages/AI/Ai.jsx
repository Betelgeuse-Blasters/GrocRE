import { useState, useEffect, useRef } from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import { Input, Button, Rate } from "antd";
import anime from "animejs/lib/anime.es.js";
import "../../styles/Ai.css";

export default function Ai() {
  var testData = {
    recipeName: "Cheesy Mashed Potatoes",
    recipeDescription: "Creamy mashed potatoes with melted cheese on top.",
    recipeSteps: [
      ["1. Wash and peel the potatoes."],
      ["2. Cut the potatoes into small chunks."],
      [
        "3. Boil the potatoes in a pot of salted water until tender, about 15-20 minutes.",
      ],
      ["4. Drain the potatoes and return them to the pot."],
      ["5. Mash the potatoes using a potato masher or a fork until smooth."],
      ["6. Add butter, milk, and shredded cheese to the mashed potatoes."],
      ["7. Stir the mixture until the cheese is melted and well combined."],
      ["8. Season the cheesy mashed potatoes with salt and pepper to taste."],
      ["9. Serve hot and enjoy!"],
    ],
    servingSize: 4,
    nutritionFacts: {
      calories: 300,
      totalFat: 12,
      saturatedFat: 6,
      cholesterol: 25,
      sodium: 400,
      carbohydrates: 40,
      fiber: 4,
      sugars: 2,
      protein: 8,
    },
    ingredients: [
      ["2.5", "pounds", "potatoes"],
      ["4", "tablespoons", "butter"],
      ["1", "cup", "milk"],
      ["2", "cups", "shredded cheese"],
      ["1.5", "teaspoons", "salt"],
      ["0.5", "teaspoon", "pepper"],
    ],
  };
  const [meal, setMeal] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const meatballLoadRef = useRef(null);
  // const ratRef = useRef(null);

  const prompts = [
    "Mountain Dew Based Meal",
    "A Kiel meal",
    "Potato salad from Spongebob",
    "The meatball man is coming",
    "Have you looked at your bank account lately?",
    "vegan kosher hotdog",
  ];

  const [promptIdeas, setPromptIdeas] = useState(prompts[0]);
  const [promptIndex, setPromptIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIdeas(prompts[promptIndex]);

      if (promptIndex === prompts.length - 1) {
        setPromptIndex(0);
      } else {
        var num = promptIndex;
        setPromptIndex(num + 1);
      }
    }, 8000);

    return () => clearInterval(timer);
  }, [promptIndex]);

  useEffect(() => {
    anime({
      targets: meatballLoadRef.current,
      rotateZ: 360,
      loop: true,
      easing: "linear",
    });
  }, []);

  // useEffect(() => {
  //   anime({
  //     targets: ratRef.current,
  //     rotateZ: 360,
  //     loop: true,
  //     easing: 'linear'
  //   })
  // }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/getRecipe", {
        meal: inputValue,
      });
      console.log("can i get uhhhhhhhh", response.data.recipe);
      setMeal(response.data.recipe);
    } catch (error) {
      console.error("An error occurred while fetching the recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div style={{ cursor: `url('/fork.png'), auto` }}>
      <NavBar />
      <h1 className="text-6xl flex justify-center">Let's Get Cookin'!</h1>
      <div className="flex justify-center mt-5 mb-5">
        <h3 className="text-2xl w-2/3 text-center">
          Get ready to level up your culinary game with GrocRE's cutting-edge
          AI! Just toss in your wildest recipe idea or the ingredients you've
          got in your kitchen, and watch the magic happen - voilà!
        </h3>
      </div>
      <div className="flex flex-row justify-center mb-5 space-x-4">
        <Input
          placeholder="Can I get uhhhhhhhh..."
          value={inputValue}
          onChange={handleInput}
          className="w-2/4 text-2xl"
        ></Input>
        <Button onClick={handleSearch} className="text-xl h-fit w-fit">
          Submit
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center" ref={meatballLoadRef}>
          <img src="../../../public/meatball.png" className="w-10 h-10" />
        </div>
      ) : null}
      {meal ? (
        <div className="flex flex-row ml-5">
          <div className="flex flex-col w-1/3 relative">
            <div className="absolute top-0 right-0">
              <Rate count="1" className="flex "></Rate>
            </div>
            <img
              // ref={ratRef}
              src="https://bolt-gcdn.sc-cdn.net/3/iAgMd936GPdlxahIYCPlt?bo=EhgaABoAMgF9OgEEQgYI_bOh9AVIAlASYAE%3D&uc=18"
              className="w-fit self-center"
            />
            <div className="border-2 mt-5">
              <h1 className="text-2xl font-medium"> Serving Size: </h1>
              <h2 className="text-lg">{meal.servingSize} </h2>
              <h1 className="text-2xl font-medium">Nutrition: </h1>
              <ol className="text-lg">
                <li>Calories: {meal.nutritionFacts.calories} kCal</li>
                <li>Total Fat: {meal.nutritionFacts.totalFat} g</li>
                <li>Saturated Fat: {meal.nutritionFacts.saturatedFat} g</li>
                <li>Cholesterol: {meal.nutritionFacts.cholesterol} mg</li>
                <li>Sodium: {meal.nutritionFacts.sodium} mg</li>
                <li>Carbohydrates: {meal.nutritionFacts.carbohydrates} g</li>
                <li>Fiber: {meal.nutritionFacts.fiber} g</li>
                <li>Sugars: {meal.nutritionFacts.sugars} g</li>
                <li>Protein: {meal.nutritionFacts.protein} g</li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col w-2/3 mr-5 ml-5">
            <div className="text-4xl flex justify-center font-medium mb-2">
              {meal.recipeName}
            </div>
            <div className="border-2">
              <h1 className="text-2xl font-medium">Description: </h1>
              <h2 className="text-lg">{meal.recipeDescription}</h2>
            </div>
            <div className="border-2 mt-5">
              <h1 className="text-2xl font-medium">Ingredients: </h1>
              <ul className="text-lg">
                {meal.ingredients.map((item, index) => (
                  <li key={index}>
                    {item[0]} {item[1]} {item[2]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 mt-5">
              <h1 className="text-2xl font-medium">Directions: </h1>
              <ul className="text-lg">
                {meal.recipeSteps.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-2xl">
          <strong className="mr-5 w-1/4 text-end">Try: </strong>
          <div className="w-3/4 text-start">
            <span
              key={promptIndex}
              style={{ animation: "fadeInOut 8s infinite" }}
            >
              {" "}
              {promptIdeas}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
