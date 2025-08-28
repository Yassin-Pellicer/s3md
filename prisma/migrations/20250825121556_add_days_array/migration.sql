/*
  Warnings:

  - The `days` column on the `Series` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "days",
ADD COLUMN     "days" TEXT[];
