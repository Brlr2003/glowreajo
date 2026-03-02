"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
const DEFAULT_WHATSAPP = "962782045415";

export function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState(DEFAULT_WHATSAPP);

  useEffect(() => {
    fetch(`${BACKEND_URL}/store/site-settings`, {
      headers: { "x-publishable-api-key": API_KEY },
    })
      .then((res: Response) => res.json())
      .then((data: any) => {
        if (data.site_setting?.whatsapp) {
          setWhatsapp(data.site_setting.whatsapp);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <motion.a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(37, 211, 102, 0.4)",
          "0 0 0 12px rgba(37, 211, 102, 0)",
        ],
      }}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity },
      }}
      aria-label="Contact us on WhatsApp">
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
