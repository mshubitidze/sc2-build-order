/*
  Warnings:

  - You are about to drop the `Build` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuildOrder" DROP CONSTRAINT "BuildOrder_buildId_fkey";

-- DropTable
DROP TABLE "Build";

-- CreateTable
CREATE TABLE "BuildSteps" (
    "id" TEXT NOT NULL,
    "supply" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "BuildSteps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BuildOrder" ADD CONSTRAINT "BuildOrder_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "BuildSteps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
