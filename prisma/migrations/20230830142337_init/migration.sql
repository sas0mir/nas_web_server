-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
