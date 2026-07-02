export type UserDto = {
  id: string;
  email: string;
  name: string;
  plan: string;
};

export type DashboardMetricDto = {
  id: string;
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

export type VideoDto = {
  id: string;
  title: string;
  views: string;
  engagement: string;
  trend: string;
};

export type OverviewResponse = {
  metrics: DashboardMetricDto[];
  videos: VideoDto[];
  weeklyViews: number[];
  growthScore: number;
};

export type AnalyticsResponse = {
  metrics: DashboardMetricDto[];
  viewsTrend: number[];
  engagementTrend: number[];
  extras: { label: string; value: string }[];
};

export type ContentResponse = {
  formats: { id: string; format: string; posts: number; avgViews: string }[];
  videos: VideoDto[];
};

export type AudienceResponse = {
  segments: { id: string; label: string; value: number }[];
  insights: string[];
};
