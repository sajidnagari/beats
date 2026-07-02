export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: ["auth", "me"] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    overview: ["dashboard", "overview"] as const,
    analytics: ["dashboard", "analytics"] as const,
    content: ["dashboard", "content"] as const,
    audience: ["dashboard", "audience"] as const,
  },
} as const;
