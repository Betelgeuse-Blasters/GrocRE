-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "sessionHash" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "sessions"("id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
