/*
  Warnings:

  - You are about to drop the column `fires` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `hearts` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "fires",
DROP COLUMN "hearts",
DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Heart" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Heart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fire" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Fire_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_key" ON "Like"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Heart_userId_key" ON "Heart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Fire_userId_key" ON "Fire"("userId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart" ADD CONSTRAINT "Heart_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart" ADD CONSTRAINT "Heart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fire" ADD CONSTRAINT "Fire_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fire" ADD CONSTRAINT "Fire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
