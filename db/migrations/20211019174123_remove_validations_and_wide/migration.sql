/*
  Warnings:

  - You are about to drop the column `validations` on the `CustomInput` table. All the data in the column will be lost.
  - You are about to drop the column `wide` on the `CustomInput` table. All the data in the column will be lost.
  - You are about to drop the column `validations` on the `Input` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomInput" DROP COLUMN "validations",
DROP COLUMN "wide";

-- AlterTable
ALTER TABLE "Input" DROP COLUMN "validations";

-- DropEnum
DROP TYPE "Validation";
