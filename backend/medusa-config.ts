import { defineConfig } from "@medusajs/framework/utils"

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL || "postgres://medusa:medusa@localhost:5433/medusa",
    redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:4000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000",
      authCors: process.env.AUTH_CORS || "http://localhost:4000,http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  admin: {
    path: "/app",
    disable: process.env.DISABLE_ADMIN === "true",
  },
  modules: [
    {
      resolve: "./src/modules/blog",
    },
    {
      resolve: "./src/modules/site-settings",
    },
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION || "auto",
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
              prefix: process.env.S3_PREFIX || "",
              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },
  ],
})
