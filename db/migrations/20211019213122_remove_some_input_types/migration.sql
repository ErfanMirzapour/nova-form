/*
  Warnings:

  - The values [SELECT,CHECKBOX,RADIO,SWITCH] on the enum `InputType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `options` on the `CustomInput` table. All the data in the column will be lost.
  - You are about to drop the column `hasOptions` on the `Input` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InputType_new" AS ENUM ('TEXT', 'PASSWORD', 'EMAIL', 'URL', 'NUMBER', 'TEXTAREA');
ALTER TABLE "CustomInput" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Input" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "CustomInput" ALTER COLUMN "type" TYPE "InputType_new" USING ("type"::text::"InputType_new");
ALTER TABLE "Input" ALTER COLUMN "type" TYPE "InputType_new" USING ("type"::text::"InputType_new");
ALTER TYPE "InputType" RENAME TO "InputType_old";
ALTER TYPE "InputType_new" RENAME TO "InputType";
DROP TYPE "InputType_old";
ALTER TABLE "CustomInput" ALTER COLUMN "type" SET DEFAULT 'TEXT';
ALTER TABLE "Input" ALTER COLUMN "type" SET DEFAULT 'TEXT';
COMMIT;

-- AlterTable
ALTER TABLE "CustomInput" DROP COLUMN "options";

-- AlterTable
ALTER TABLE "Input" DROP COLUMN "hasOptions";
