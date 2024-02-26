/*
  Warnings:

  - A unique constraint covering the columns `[blockId]` on the table `UserBlock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserBlock_blockId_key" ON "UserBlock"("blockId");
