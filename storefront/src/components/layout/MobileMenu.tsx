"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  X,
  Home,
  ShoppingBag,
  Info,
  MessageCircle,
  Store,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("common");
  const { totalItems, toggleDrawer } = useCart();

  const links = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/shop", label: t("shop"), icon: Store },
    { href: "/about", label: t("about"), icon: Info },
    { href: "/blog", label: t("blog"), icon: BookOpen },
    { href: "/faq", label: t("faq"), icon: HelpCircle },
    { href: "/contact", label: t("contact"), icon: MessageCircle },
  ];

  const handleCartClick = () => {
    onClose();
    toggleDrawer();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-30 left-4 right-4 z-50 mx-auto max-w-6xl rounded-2xl bg-surface shadow-elevated border border-border/50 overflow-hidden sm:left-6 sm:right-6">
            <nav className="p-3">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-text-primary hover:bg-primary/10 hover:text-primary transition-colors">
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.04 }}>
                <button
                  onClick={handleCartClick}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-text-primary hover:bg-primary/10 hover:text-primary transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                  {t("cart")}
                  {totalItems > 0 && (
                    <span className="ms-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (links.length + 1) * 0.04 }}
                className="border-t border-border/50 mt-1 pt-1"
              >
                <LanguageSwitcher variant="full" />
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
