/*
  Warnings:

  - Added the required column `ownerId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "ownerId" CHAR(25) NOT NULL;

-- AddForeignKey
ALTER TABLE "Form" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
