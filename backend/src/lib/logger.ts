import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export function getLogger(req: any) {
  return req.scope.resolve(ContainerRegistrationKeys.LOGGER)
}
