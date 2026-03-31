/*
  Warnings:

  - You are about to alter the column `rent` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `deposit` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - Added the required column `genderRestriction` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('SINGLE', 'SHARING');

-- CreateEnum
CREATE TYPE "GenderRestriction" AS ENUM ('MALE_ONLY', 'FEMALE_ONLY', 'MIXED');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "genderRestriction" "GenderRestriction" NOT NULL,
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "rent" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "deposit" SET DATA TYPE DECIMAL(10,2);

-- CreateIndex
CREATE INDEX "Property_rent_idx" ON "Property"("rent");

-- CreateIndex
CREATE INDEX "Property_propertyType_idx" ON "Property"("propertyType");
