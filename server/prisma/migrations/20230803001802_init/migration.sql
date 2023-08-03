/*
  Warnings:

  - The primary key for the `UserCreatedMeals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserSavedMeals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `UserCreatedMeals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserSavedMeals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserCreatedMeals" DROP CONSTRAINT "UserCreatedMeals_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserCreatedMeals_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserSavedMeals" DROP CONSTRAINT "UserSavedMeals_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserSavedMeals_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCreatedMeals_id_key" ON "UserCreatedMeals"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSavedMeals_id_key" ON "UserSavedMeals"("id");
