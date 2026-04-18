import { defineConfig } from "prisma";

export default defineConfig({
  schema: "src/prisma/schema.prisma",

  migrate: {
    datasource: {
      url: process.env.DATABASE_URL!,
    },
  },
});
