/*
  Warnings:

  - You are about to drop the column `buildId` on the `BuildOrder` table. All the data in the column will be lost.
  - You are about to drop the `BuildSteps` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `build` to the `BuildOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BuildOrder" DROP CONSTRAINT "BuildOrder_buildId_fkey";

-- AlterTable
ALTER TABLE "BuildOrder" DROP COLUMN "buildId",
ADD COLUMN     "build" TEXT NOT NULL;

-- DropTable
DROP TABLE "BuildSteps";
