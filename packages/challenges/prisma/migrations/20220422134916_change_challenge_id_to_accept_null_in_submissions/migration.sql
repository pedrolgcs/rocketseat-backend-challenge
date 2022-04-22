-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_challengeId_fkey";

-- AlterTable
ALTER TABLE "submissions" ALTER COLUMN "challengeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
