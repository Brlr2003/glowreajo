"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { PhoneInput } from "@/components/ui/PhoneInput"
import { Button } from "@/components/ui/Button"
import { validateEmail } from "@/lib/validateEmail"

const jordanianCities = [
  { value: "amman", label: "amman" },
  { value: "zarqa", label: "zarqa" },
  { value: "irbid", label: "irbid" },
  { value: "aqaba", label: "aqaba" },
  { value: "salt", label: "salt" },
  { value: "madaba", label: "madaba" },
  { value: "karak", label: "karak" },
  { value: "jerash", label: "jerash" },
  { value: "mafraq", label: "mafraq" },
  { value: "tafilah", label: "tafilah" },
  { value: "ajloun", label: "ajloun" },
  { value: "maan", label: "maan" },
]

export interface PersonalInfo {
  firstName: string
  lastName: string
  phone: string
  email: string
  city: string
  address: string
  notes: string
}

interface PersonalInfoStepProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
  onNext: () => void
  onBack: () => void
}

export function PersonalInfoStep({ data, onChange, onNext, onBack }: PersonalInfoStepProps) {
  const t = useTranslations("checkout")
  const tCities = useTranslations("cities")
  const tErrors = useTranslations("errors")
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {}
    if (!data.firstName.trim()) newErrors.firstName = tErrors("required")
    if (!data.lastName.trim()) newErrors.lastName = tErrors("required")
    if (!data.phone.trim()) newErrors.phone = tErrors("required")
    if (!data.email.trim()) newErrors.email = tErrors("required")
    else if (!validateEmail(data.email)) newErrors.email = tErrors("invalidEmail")
    if (!data.city) newErrors.city = tErrors("required")
    if (!data.address.trim()) newErrors.address = tErrors("required")

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  const update = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  const translatedCities = jordanianCities.map((city) => ({
    value: city.value,
    label: tCities(city.label),
  }))

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold">{t("personalInfo")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t("firstName")}
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          error={errors.firstName}
        />
        <Input
          label={t("lastName")}
          value={data.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          error={errors.lastName}
        />
      </div>

      <PhoneInput
        value={data.phone}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
      />

      <Input
        label={t("email")}
        type="email"
        value={data.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />

      <Select
        label={t("city")}
        options={translatedCities}
        value={data.city}
        onChange={(e) => update("city", e.target.value)}
        error={errors.city}
      />

      <Input
        label={t("deliveryAddress")}
        value={data.address}
        onChange={(e) => update("address", e.target.value)}
        error={errors.address}
      />

      <Input
        label={t("orderNotes")}
        value={data.notes}
        onChange={(e) => update("notes", e.target.value)}
      />

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          {t("back")}
        </Button>
        <Button onClick={handleNext} size="lg">
          {t("continue")}
        </Button>
      </div>
    </div>
  )
}
