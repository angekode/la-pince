/*
  Warnings:

  - A unique constraint covering the columns `[userId,categoryId]` on the table `budget` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "budget_userId_categoryId_key" ON "budget"("userId", "categoryId");
