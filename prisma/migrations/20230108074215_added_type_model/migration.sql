-- CreateTable
CREATE TABLE "types" (
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "generation" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "types"("name");
