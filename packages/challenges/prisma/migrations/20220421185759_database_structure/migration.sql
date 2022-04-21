-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'DONE', 'ERROR');

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT E'PENDING',
    "grade" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "challengeId" TEXT NOT NULL,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
