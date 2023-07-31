/*
  Warnings:

  - You are about to drop the column `content` on the `threeDmeal` table. All the data in the column will be lost.
  - Added the required column `ingredients` to the `threeDmeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionFacts` to the `threeDmeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeDescription` to the `threeDmeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeName` to the `threeDmeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeSteps` to the `threeDmeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `threeDmeal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "threeDmeal" DROP COLUMN "content",
ADD COLUMN     "ingredients" JSONB NOT NULL,
ADD COLUMN     "nutritionFacts" JSONB NOT NULL,
ADD COLUMN     "recipeDescription" TEXT NOT NULL,
ADD COLUMN     "recipeName" TEXT NOT NULL,
ADD COLUMN     "recipeSteps" TEXT NOT NULL,
ADD COLUMN     "servingSize" TEXT NOT NULL;
