-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstname" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "savedMealsId" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savedMeals" (
    "id" UUID NOT NULL,

    CONSTRAINT "savedMeals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "threedmealId" UUID,
    "usersId" UUID,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "postsId" UUID,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mealPlans" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mealPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "threedmeal" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "savedMealsId" UUID,
    "usersId" UUID NOT NULL,

    CONSTRAINT "threedmeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_mealPlansTothreedmeal" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE INDEX "users_id_createdAt_email_idx" ON "users"("id", "createdAt", "email");

-- CreateIndex
CREATE UNIQUE INDEX "savedMeals_id_key" ON "savedMeals"("id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");

-- CreateIndex
CREATE INDEX "posts_id_createdAt_idx" ON "posts"("id", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_id_key" ON "Comments"("id");

-- CreateIndex
CREATE INDEX "Comments_id_likes_idx" ON "Comments"("id", "likes");

-- CreateIndex
CREATE UNIQUE INDEX "mealPlans_id_key" ON "mealPlans"("id");

-- CreateIndex
CREATE INDEX "mealPlans_id_idx" ON "mealPlans"("id");

-- CreateIndex
CREATE UNIQUE INDEX "threedmeal_id_key" ON "threedmeal"("id");

-- CreateIndex
CREATE INDEX "threedmeal_id_idx" ON "threedmeal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_mealPlansTothreedmeal_AB_unique" ON "_mealPlansTothreedmeal"("A", "B");

-- CreateIndex
CREATE INDEX "_mealPlansTothreedmeal_B_index" ON "_mealPlansTothreedmeal"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_savedMealsId_fkey" FOREIGN KEY ("savedMealsId") REFERENCES "savedMeals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_threedmealId_fkey" FOREIGN KEY ("threedmealId") REFERENCES "threedmeal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threedmeal" ADD CONSTRAINT "threedmeal_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threedmeal" ADD CONSTRAINT "threedmeal_savedMealsId_fkey" FOREIGN KEY ("savedMealsId") REFERENCES "savedMeals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mealPlansTothreedmeal" ADD CONSTRAINT "_mealPlansTothreedmeal_A_fkey" FOREIGN KEY ("A") REFERENCES "mealPlans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mealPlansTothreedmeal" ADD CONSTRAINT "_mealPlansTothreedmeal_B_fkey" FOREIGN KEY ("B") REFERENCES "threedmeal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
