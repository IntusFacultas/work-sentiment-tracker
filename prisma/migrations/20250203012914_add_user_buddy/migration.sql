-- CreateTable
CREATE TABLE "UserBuddy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "buddyUserId" TEXT NOT NULL,

    CONSTRAINT "UserBuddy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBuddy" ADD CONSTRAINT "UserBuddy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBuddy" ADD CONSTRAINT "UserBuddy_buddyUserId_fkey" FOREIGN KEY ("buddyUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
