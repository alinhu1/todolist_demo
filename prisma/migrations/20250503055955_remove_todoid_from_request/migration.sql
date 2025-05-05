/*
  Warnings:

  - You are about to drop the column `endTime` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `todoId` on the `Request` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_todoId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "todoId";
