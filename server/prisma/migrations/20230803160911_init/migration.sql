-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "LikesDislikes" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "LikesDislikes" ADD CONSTRAINT "LikesDislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
