/*
  Warnings:

  - A unique constraint covering the columns `[blogId,userId]` on the table `Fire` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blogId,userId]` on the table `Heart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blogId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fire_blogId_userId_key" ON "Fire"("blogId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Heart_blogId_userId_key" ON "Heart"("blogId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_blogId_userId_key" ON "Like"("blogId", "userId");
