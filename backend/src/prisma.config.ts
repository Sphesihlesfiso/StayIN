import { defineConfig } from "./";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrate: {
    datasource: {
      url: process.env.DATABASE_URL!,
    },
  },
});
