/*
  Warnings:

  - You are about to drop the column `point` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reff` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "point",
DROP COLUMN "reff";
