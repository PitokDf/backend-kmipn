/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `UserToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserToken_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_token_key" ON "UserToken"("token");