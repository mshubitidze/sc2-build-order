-- AlterTable
ALTER TABLE "BuildOrder" ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'Anonymous',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No Description',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Unknown';
