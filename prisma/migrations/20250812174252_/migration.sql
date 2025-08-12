/*
  Warnings:

  - You are about to drop the column `date` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_tutorId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "date",
ALTER COLUMN "tutorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
