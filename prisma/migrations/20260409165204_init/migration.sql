-- CreateTable
CREATE TABLE "CountryExplanation" (
    "id" TEXT NOT NULL,
    "cacheKey" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "canonicalDataHash" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "modelVersion" TEXT NOT NULL,
    "payloadJson" JSONB NOT NULL,
    "validationStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CountryExplanation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryExplanation_cacheKey_key" ON "CountryExplanation"("cacheKey");
