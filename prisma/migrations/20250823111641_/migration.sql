-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);
