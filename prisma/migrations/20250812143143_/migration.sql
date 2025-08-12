-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_tutorId_fkey";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "tutorId" DROP NOT NULL,
ALTER COLUMN "topic" DROP NOT NULL,
ALTER COLUMN "materialRoute" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
