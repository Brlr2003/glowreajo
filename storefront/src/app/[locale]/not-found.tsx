import { Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations("errors")
  const tc = useTranslations("common")

  return (
    <div className="container-app py-20 text-center">
      <div className="flex justify-center mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Search className="h-10 w-10 text-primary" />
        </div>
      </div>
      <h1 className="font-heading text-6xl font-bold text-text-primary mb-3">404</h1>
      <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">
        {t("notFound")}
      </h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        {t("notFoundDescription")}
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/">
          <Button>{t("goHome")}</Button>
        </Link>
        <Link href="/shop">
          <Button variant="outline">{tc("shop")}</Button>
        </Link>
      </div>
    </div>
  )
}
