/*
  Warnings:

  - You are about to drop the `Fire` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Heart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fire" DROP CONSTRAINT "Fire_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Fire" DROP CONSTRAINT "Fire_userId_fkey";

-- DropForeignKey
ALTER TABLE "Heart" DROP CONSTRAINT "Heart_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Heart" DROP CONSTRAINT "Heart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropTable
DROP TABLE "Fire";

-- DropTable
DROP TABLE "Heart";

-- DropTable
DROP TABLE "Like";
