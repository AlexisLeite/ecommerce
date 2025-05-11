/*
  Warnings:

  - You are about to drop the column `file` on the `Image` table. All the data in the column will be lost.
  - Added the required column `data` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "file",
ADD COLUMN     "data" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
