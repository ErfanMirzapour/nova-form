/*
  Warnings:

  - You are about to drop the column `fieldSetId` on the `CustomInput` table. All the data in the column will be lost.
  - You are about to drop the `FieldSet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `formId` to the `CustomInput` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomInput" DROP CONSTRAINT "CustomInput_fieldSetId_fkey";

-- DropForeignKey
ALTER TABLE "FieldSet" DROP CONSTRAINT "FieldSet_formId_fkey";

-- AlterTable
ALTER TABLE "CustomInput" DROP COLUMN "fieldSetId",
ADD COLUMN     "formId" CHAR(25) NOT NULL;

-- DropTable
DROP TABLE "FieldSet";

-- AddForeignKey
ALTER TABLE "CustomInput" ADD FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
