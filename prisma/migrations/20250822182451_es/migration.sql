/*
  Warnings:

  - You are about to drop the column `capacity` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "capacity",
DROP COLUMN "price",
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
