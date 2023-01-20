/*
  Warnings:

  - You are about to drop the column `buildSteps` on the `BuildOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BuildOrder" DROP COLUMN "buildSteps";

-- CreateTable
CREATE TABLE "BuildStep" (
    "id" TEXT NOT NULL,
    "supply" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "note" TEXT,
    "buildOrderId" TEXT,

    CONSTRAINT "BuildStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BuildStep" ADD CONSTRAINT "BuildStep_buildOrderId_fkey" FOREIGN KEY ("buildOrderId") REFERENCES "BuildOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
