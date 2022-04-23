/*
  Warnings:

  - You are about to drop the `submissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AnswerStatus" AS ENUM ('PENDING', 'DONE', 'ERROR');

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_challengeId_fkey";

-- DropTable
DROP TABLE "submissions";

-- DropEnum
DROP TYPE "SubmissionStatus";

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "status" "AnswerStatus" NOT NULL DEFAULT E'PENDING',
    "grade" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "challengeId" TEXT,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
