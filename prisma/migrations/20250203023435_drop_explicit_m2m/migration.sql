/*
  Warnings:

  - You are about to drop the `UserBuddy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBuddy" DROP CONSTRAINT "UserBuddy_buddyUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserBuddy" DROP CONSTRAINT "UserBuddy_userId_fkey";

-- DropTable
DROP TABLE "UserBuddy";

-- CreateTable
CREATE TABLE "_Buddies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Buddies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Buddies_B_index" ON "_Buddies"("B");

-- AddForeignKey
ALTER TABLE "_Buddies" ADD CONSTRAINT "_Buddies_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Buddies" ADD CONSTRAINT "_Buddies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
