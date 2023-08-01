CREATE TABLE "user_saved_meals"(
    "user_id" INTEGER NULL,
    "recipe_id" BIGINT NOT NULL
);
CREATE TABLE "users"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "meal_plans"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NULL,
    "user_id" INTEGER NULL
);
ALTER TABLE
    "meal_plans" ADD PRIMARY KEY("id");
CREATE TABLE "recipes"(
    "id" SERIAL NOT NULL,
    "recipe_name" VARCHAR(255) NOT NULL,
    "recipe_description" VARCHAR(255) NOT NULL,
    "recipe_steps" JSON NOT NULL,
    "serving_size" INTEGER NOT NULL,
    "nutrition_facts" JSON NOT NULL,
    "ingredients" JSON NOT NULL,
    "creator_id" INTEGER NULL
);
ALTER TABLE
    "recipes" ADD PRIMARY KEY("id");
CREATE TABLE "meal_plan_to_recipe"(
    "meal_plan_id" INTEGER NULL,
    "recipe_id" BIGINT NOT NULL
);
CREATE TABLE "user_created_meals"(
    "user_id" INTEGER NULL,
    "recipe_id" BIGINT NOT NULL
);
ALTER TABLE
    "user_created_meals" ADD CONSTRAINT "user_created_meals_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "meal_plan_to_recipe" ADD CONSTRAINT "meal_plan_to_recipe_meal_plan_id_foreign" FOREIGN KEY("meal_plan_id") REFERENCES "meal_plans"("id");
ALTER TABLE
    "meal_plan_to_recipe" ADD CONSTRAINT "meal_plan_to_recipe_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipes"("id");
ALTER TABLE
    "recipes" ADD CONSTRAINT "recipes_creator_id_foreign" FOREIGN KEY("creator_id") REFERENCES "users"("id");
ALTER TABLE
    "user_saved_meals" ADD CONSTRAINT "user_saved_meals_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "user_saved_meals" ADD CONSTRAINT "user_saved_meals_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipes"("id");
ALTER TABLE
    "meal_plans" ADD CONSTRAINT "meal_plans_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "user_created_meals" ADD CONSTRAINT "user_created_meals_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipes"("id");