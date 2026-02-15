"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { PhoneInput } from "@/components/ui/PhoneInput"
import { Button } from "@/components/ui/Button"
import { validateEmail } from "@/lib/validateEmail"

const jordanianCities = [
  { value: "amman", label: "Amman" },
  { value: "zarqa", label: "Zarqa" },
  { value: "irbid", label: "Irbid" },
  { value: "aqaba", label: "Aqaba" },
  { value: "salt", label: "Salt" },
  { value: "madaba", label: "Madaba" },
  { value: "karak", label: "Karak" },
  { value: "jerash", label: "Jerash" },
  { value: "mafraq", label: "Mafraq" },
  { value: "tafilah", label: "Tafilah" },
  { value: "ajloun", label: "Ajloun" },
  { value: "maan", label: "Ma'an" },
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
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {}
    if (!data.firstName.trim()) newErrors.firstName = "Required"
    if (!data.lastName.trim()) newErrors.lastName = "Required"
    if (!data.phone.trim()) newErrors.phone = "Required"
    if (!data.email.trim()) newErrors.email = "Required"
    else if (!validateEmail(data.email)) newErrors.email = "Invalid email"
    if (!data.city) newErrors.city = "Required"
    if (!data.address.trim()) newErrors.address = "Required"

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

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold">Personal Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          error={errors.firstName}
        />
        <Input
          label="Last Name"
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
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />

      <Select
        label="City"
        options={jordanianCities}
        value={data.city}
        onChange={(e) => update("city", e.target.value)}
        error={errors.city}
      />

      <Input
        label="Delivery Address"
        value={data.address}
        onChange={(e) => update("address", e.target.value)}
        error={errors.address}
      />

      <Input
        label="Order Notes (optional)"
        value={data.notes}
        onChange={(e) => update("notes", e.target.value)}
      />

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} size="lg">
          Continue
        </Button>
      </div>
    </div>
  )
}
