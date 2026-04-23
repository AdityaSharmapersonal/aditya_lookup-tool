-- CreateTable
CREATE TABLE "CountryExplanation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cacheKey" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "canonicalDataHash" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "modelVersion" TEXT NOT NULL,
    "payloadJson" JSONB NOT NULL,
    "validationStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryExplanation_cacheKey_key" ON "CountryExplanation"("cacheKey");
