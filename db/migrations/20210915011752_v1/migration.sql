-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "InputType" AS ENUM ('TEXT', 'PASSWORD', 'EMAIL', 'URL', 'NUMBER', 'SELECT', 'CHECKBOX', 'RADIO', 'TEXTAREA', 'SWITCH');

-- CreateEnum
CREATE TYPE "Validation" AS ENUM ('MANDATORY', 'LENGTH', 'RANGE');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,
    "userId" CHAR(25),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" CHAR(25) NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "fullName" CHAR(50),
    "role" "Role" NOT NULL DEFAULT E'USER',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" CHAR(25) NOT NULL,
    "title" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormResult" (
    "id" CHAR(25) NOT NULL,
    "result" JSONB NOT NULL,
    "formId" CHAR(25) NOT NULL,
    "submitterId" CHAR(25) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldSet" (
    "id" CHAR(25) NOT NULL,
    "legend" VARCHAR(100) NOT NULL,
    "formId" CHAR(25) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomInput" (
    "id" CHAR(25) NOT NULL,
    "type" "InputType" NOT NULL DEFAULT E'TEXT',
    "label" VARCHAR(50) NOT NULL,
    "placeholder" VARCHAR(100),
    "defaultValue" TEXT,
    "wide" BOOLEAN NOT NULL DEFAULT true,
    "options" TEXT[],
    "validations" "Validation"[],
    "fieldSetId" CHAR(25) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Input" (
    "type" "InputType" NOT NULL DEFAULT E'TEXT',
    "title" VARCHAR(50) NOT NULL,
    "hasOptions" BOOLEAN NOT NULL DEFAULT false,
    "validations" "Validation"[],

    PRIMARY KEY ("type")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResult" ADD FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResult" ADD FOREIGN KEY ("submitterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldSet" ADD FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomInput" ADD FOREIGN KEY ("fieldSetId") REFERENCES "FieldSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
