/*
  Warnings:

  - You are about to drop the column `storyTableId` on the `story` table. All the data in the column will be lost.
  - You are about to drop the `storyTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "story" DROP CONSTRAINT "story_storyTableId_fkey";

-- DropForeignKey
ALTER TABLE "storyTable" DROP CONSTRAINT "storyTable_userId_fkey";

-- AlterTable
ALTER TABLE "story" DROP COLUMN "storyTableId",
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "storyTable";

-- AddForeignKey
ALTER TABLE "story" ADD CONSTRAINT "story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
