/*
  Warnings:

  - You are about to drop the `_mealPlansTothreedmeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `threedmeal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_mealPlansTothreedmeal" DROP CONSTRAINT "_mealPlansTothreedmeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_mealPlansTothreedmeal" DROP CONSTRAINT "_mealPlansTothreedmeal_B_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_threedmealId_fkey";

-- DropForeignKey
ALTER TABLE "threedmeal" DROP CONSTRAINT "threedmeal_savedMealsId_fkey";

-- DropForeignKey
ALTER TABLE "threedmeal" DROP CONSTRAINT "threedmeal_usersId_fkey";

-- DropTable
DROP TABLE "_mealPlansTothreedmeal";

-- DropTable
DROP TABLE "threedmeal";

-- CreateTable
CREATE TABLE "threeDmeal" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "savedMealsId" UUID,
    "usersId" UUID NOT NULL,

    CONSTRAINT "threeDmeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_mealPlansTothreeDmeal" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "threeDmeal_id_key" ON "threeDmeal"("id");

-- CreateIndex
CREATE INDEX "threeDmeal_id_idx" ON "threeDmeal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_mealPlansTothreeDmeal_AB_unique" ON "_mealPlansTothreeDmeal"("A", "B");

-- CreateIndex
CREATE INDEX "_mealPlansTothreeDmeal_B_index" ON "_mealPlansTothreeDmeal"("B");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_threedmealId_fkey" FOREIGN KEY ("threedmealId") REFERENCES "threeDmeal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threeDmeal" ADD CONSTRAINT "threeDmeal_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threeDmeal" ADD CONSTRAINT "threeDmeal_savedMealsId_fkey" FOREIGN KEY ("savedMealsId") REFERENCES "savedMeals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mealPlansTothreeDmeal" ADD CONSTRAINT "_mealPlansTothreeDmeal_A_fkey" FOREIGN KEY ("A") REFERENCES "mealPlans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mealPlansTothreeDmeal" ADD CONSTRAINT "_mealPlansTothreeDmeal_B_fkey" FOREIGN KEY ("B") REFERENCES "threeDmeal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
