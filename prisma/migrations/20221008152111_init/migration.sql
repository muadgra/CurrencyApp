-- CreateTable
CREATE TABLE "UserInformation" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "UserInformation_pkey" PRIMARY KEY ("id")
);
