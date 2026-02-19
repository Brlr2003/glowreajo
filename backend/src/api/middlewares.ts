import { defineMiddlewares } from "@medusajs/medusa"
import { getLogger } from "../lib/logger"

function requestLogger(req: any, res: any, next: any) {
  const start = Date.now()
  res.on("finish", () => {
    const logger = getLogger(req)
    const duration = Date.now() - start
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`)
  })
  next()
}

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/**",
      middlewares: [requestLogger],
    },
    {
      matcher: "/store/otp/**",
      middlewares: [],
      additionalDataValidator: undefined,
    },
  ],
})
