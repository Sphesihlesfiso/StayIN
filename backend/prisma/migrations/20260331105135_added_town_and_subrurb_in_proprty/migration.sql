/*
  Warnings:

  - Added the required column `surburb` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `town` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "surburb" TEXT NOT NULL,
ADD COLUMN     "town" TEXT NOT NULL;
