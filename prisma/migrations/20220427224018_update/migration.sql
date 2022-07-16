/*
  Warnings:

  - You are about to drop the column `descriptionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `storyTableId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wishListId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Description` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `StoryTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_storyTableId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_wishListId_fkey";

-- AlterTable
ALTER TABLE "Description" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StoryTable" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "descriptionId",
DROP COLUMN "storyTableId",
DROP COLUMN "wishListId";

-- AlterTable
ALTER TABLE "WishList" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryTable" ADD CONSTRAINT "StoryTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
