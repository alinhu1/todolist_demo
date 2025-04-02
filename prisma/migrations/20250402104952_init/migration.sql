-- CreateTable
CREATE TABLE "Todos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);
