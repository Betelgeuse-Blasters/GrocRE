/*
  Warnings:

  - Changed the type of `recipeSteps` on the `threeDmeal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "threeDmeal" DROP COLUMN "recipeSteps",
ADD COLUMN     "recipeSteps" JSONB NOT NULL;
