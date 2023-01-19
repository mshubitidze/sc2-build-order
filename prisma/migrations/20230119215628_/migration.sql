/*
  Warnings:

  - You are about to drop the `Build` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Build" DROP CONSTRAINT "Build_buildOrderId_fkey";

-- AlterTable
ALTER TABLE "BuildOrder" ADD COLUMN     "buildSteps" JSONB[];

-- DropTable
DROP TABLE "Build";
