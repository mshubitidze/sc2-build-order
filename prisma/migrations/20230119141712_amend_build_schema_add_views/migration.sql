/*
  Warnings:

  - You are about to drop the column `build` on the `BuildOrder` table. All the data in the column will be lost.
  - Added the required column `buildId` to the `BuildOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuildOrder" DROP COLUMN "build",
ADD COLUMN     "buildId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Build" (
    "id" TEXT NOT NULL,
    "supply" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BuildOrder" ADD CONSTRAINT "BuildOrder_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
