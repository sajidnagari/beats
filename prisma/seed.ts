import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("demo123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@pulsetok.io" },
    update: {},
    create: {
      email: "demo@pulsetok.io",
      name: "Sajid Ali",
      password,
      plan: "Pro",
    },
  });

  await prisma.dashboardMetric.deleteMany({ where: { userId: user.id } });
  await prisma.video.deleteMany({ where: { userId: user.id } });
  await prisma.audienceSegment.deleteMany({ where: { userId: user.id } });
  await prisma.contentFormat.deleteMany({ where: { userId: user.id } });
  await prisma.dailyViewStat.deleteMany({ where: { userId: user.id } });

  await prisma.dashboardMetric.createMany({
    data: [
      { userId: user.id, label: "Total Views", value: "1.28M", change: "+18.4%", positive: true, order: 0 },
      { userId: user.id, label: "Engagement Rate", value: "9.2%", change: "+2.1%", positive: true, order: 1 },
      { userId: user.id, label: "New Followers", value: "4,820", change: "+12.7%", positive: true, order: 2 },
      { userId: user.id, label: "Avg Watch Time", value: "14.6s", change: "-0.8%", positive: false, order: 3 },
    ],
  });

  await prisma.video.createMany({
    data: [
      { userId: user.id, title: "3 hooks that doubled my views", views: "214K", engagement: "11.4%", trend: "+32%", order: 0 },
      { userId: user.id, title: "Day in the life: creator routine", views: "168K", engagement: "9.8%", trend: "+18%", order: 1 },
      { userId: user.id, title: "Trend sound breakdown", views: "142K", engagement: "8.6%", trend: "+9%", order: 2 },
      { userId: user.id, title: "How I plan weekly content", views: "96K", engagement: "7.9%", trend: "+5%", order: 3 },
    ],
  });

  await prisma.audienceSegment.createMany({
    data: [
      { userId: user.id, label: "18-24", value: 38, order: 0 },
      { userId: user.id, label: "25-34", value: 34, order: 1 },
      { userId: user.id, label: "35-44", value: 18, order: 2 },
      { userId: user.id, label: "45+", value: 10, order: 3 },
    ],
  });

  await prisma.contentFormat.createMany({
    data: [
      { userId: user.id, format: "Short tips", posts: 24, avgViews: "82K", order: 0 },
      { userId: user.id, format: "Storytime", posts: 12, avgViews: "64K", order: 1 },
      { userId: user.id, format: "Trend remix", posts: 18, avgViews: "71K", order: 2 },
      { userId: user.id, format: "Tutorials", posts: 9, avgViews: "58K", order: 3 },
    ],
  });

  const now = new Date();
  const weekly = [42, 55, 48, 72, 66, 84, 78];
  await prisma.dailyViewStat.createMany({
    data: weekly.map((value, index) => ({
      userId: user.id,
      day: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - index)),
      value,
    })),
  });

  console.log("Seed complete. Demo user: demo@pulsetok.io / demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
