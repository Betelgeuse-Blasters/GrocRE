/*
  Warnings:

  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_mealPlansTothreeDmeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mealPlans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `savedMeals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `threeDmeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postsId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_usersId_fkey";

-- DropForeignKey
ALTER TABLE "_mealPlansTothreeDmeal" DROP CONSTRAINT "_mealPlansTothreeDmeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_mealPlansTothreeDmeal" DROP CONSTRAINT "_mealPlansTothreeDmeal_B_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_threedmealId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_usersId_fkey";

-- DropForeignKey
ALTER TABLE "threeDmeal" DROP CONSTRAINT "threeDmeal_savedMealsId_fkey";

-- DropForeignKey
ALTER TABLE "threeDmeal" DROP CONSTRAINT "threeDmeal_usersId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_savedMealsId_fkey";

-- DropTable
DROP TABLE "Comments";

-- DropTable
DROP TABLE "_mealPlansTothreeDmeal";

-- DropTable
DROP TABLE "mealPlans";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "savedMeals";

-- DropTable
DROP TABLE "threeDmeal";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "recipeName" TEXT NOT NULL,
    "recipeDescription" TEXT NOT NULL,
    "recipeSteps" JSONB NOT NULL,
    "servingSize" INTEGER NOT NULL,
    "nutritionFacts" JSONB NOT NULL,
    "ingredients" JSONB NOT NULL,
    "creatorId" INTEGER,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlanToRecipe" (
    "mealPlanId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "MealPlanToRecipe_pkey" PRIMARY KEY ("mealPlanId","recipeId")
);

-- CreateTable
CREATE TABLE "UserSavedMeals" (
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "UserSavedMeals_pkey" PRIMARY KEY ("userId","recipeId")
);

-- CreateTable
CREATE TABLE "UserCreatedMeals" (
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "UserCreatedMeals_pkey" PRIMARY KEY ("userId","recipeId")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mealId" INTEGER,
    "mealPlanId" INTEGER,
    "type" BOOLEAN NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikesDislikes" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "isLike" BOOLEAN NOT NULL,

    CONSTRAINT "LikesDislikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserSavedMeals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MealPlanToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSavedMeals_AB_unique" ON "_UserSavedMeals"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSavedMeals_B_index" ON "_UserSavedMeals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MealPlanToRecipe_AB_unique" ON "_MealPlanToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_MealPlanToRecipe_B_index" ON "_MealPlanToRecipe"("B");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanToRecipe" ADD CONSTRAINT "MealPlanToRecipe_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanToRecipe" ADD CONSTRAINT "MealPlanToRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedMeals" ADD CONSTRAINT "UserSavedMeals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedMeals" ADD CONSTRAINT "UserSavedMeals_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCreatedMeals" ADD CONSTRAINT "UserCreatedMeals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCreatedMeals" ADD CONSTRAINT "UserCreatedMeals_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesDislikes" ADD CONSTRAINT "LikesDislikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSavedMeals" ADD CONSTRAINT "_UserSavedMeals_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSavedMeals" ADD CONSTRAINT "_UserSavedMeals_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPlanToRecipe" ADD CONSTRAINT "_MealPlanToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPlanToRecipe" ADD CONSTRAINT "_MealPlanToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
