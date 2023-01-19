-- CreateTable
CREATE TABLE "Build" (
    "id" TEXT NOT NULL,
    "supply" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "buildOrderId" TEXT,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_buildOrderId_fkey" FOREIGN KEY ("buildOrderId") REFERENCES "BuildOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
