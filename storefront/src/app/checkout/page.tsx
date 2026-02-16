"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress"
import { CartReviewStep } from "@/components/checkout/CartReviewStep"
import { PersonalInfoStep, type PersonalInfo } from "@/components/checkout/PersonalInfoStep"
import { OtpVerificationStep } from "@/components/checkout/OtpVerificationStep"
import { OrderConfirmStep } from "@/components/checkout/OrderConfirmStep"

const steps = ["Cart", "Details", "Verify", "Confirm"]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
  })

  return (
    <div className="container-app py-8 max-w-2xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-text-primary text-center mb-8">Checkout</h1>

      <CheckoutProgress currentStep={currentStep} steps={steps} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 0 && (
            <CartReviewStep onNext={() => setCurrentStep(1)} />
          )}
          {currentStep === 1 && (
            <PersonalInfoStep
              data={personalInfo}
              onChange={setPersonalInfo}
              onNext={() => setCurrentStep(2)}
              onBack={() => setCurrentStep(0)}
            />
          )}
          {currentStep === 2 && (
            <OtpVerificationStep
              email={personalInfo.email}
              onVerified={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <OrderConfirmStep
              personalInfo={personalInfo}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
