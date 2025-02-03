/*
  Warnings:

  - A unique constraint covering the columns `[buddyCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_buddyCode_key" ON "User"("buddyCode");
