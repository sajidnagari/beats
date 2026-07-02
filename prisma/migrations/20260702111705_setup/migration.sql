-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'Pro',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardMetric" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "change" TEXT NOT NULL,
    "positive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DashboardMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "views" TEXT NOT NULL,
    "engagement" TEXT NOT NULL,
    "trend" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudienceSegment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AudienceSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentFormat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "posts" INTEGER NOT NULL,
    "avgViews" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ContentFormat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyViewStat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "DailyViewStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "DashboardMetric_userId_idx" ON "DashboardMetric"("userId");

-- CreateIndex
CREATE INDEX "Video_userId_idx" ON "Video"("userId");

-- CreateIndex
CREATE INDEX "AudienceSegment_userId_idx" ON "AudienceSegment"("userId");

-- CreateIndex
CREATE INDEX "ContentFormat_userId_idx" ON "ContentFormat"("userId");

-- CreateIndex
CREATE INDEX "DailyViewStat_userId_day_idx" ON "DailyViewStat"("userId", "day");

-- AddForeignKey
ALTER TABLE "DashboardMetric" ADD CONSTRAINT "DashboardMetric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudienceSegment" ADD CONSTRAINT "AudienceSegment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentFormat" ADD CONSTRAINT "ContentFormat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyViewStat" ADD CONSTRAINT "DailyViewStat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
