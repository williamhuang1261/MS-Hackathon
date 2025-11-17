"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/donation-utils";
import { Button } from "../ui/button";

interface UpsellModalProps {
  show: boolean;
  currentAmount: number;
  onAccept: () => void;
  onDecline: () => void;
  onDismiss?: () => void;
}

const UpsellModal = ({
  show,
  currentAmount,
  onAccept,
  onDecline,
  onDismiss,
}: UpsellModalProps) => {
  const t = useTranslations("donation.upsell");

  const empathyStatements = [t("empathy1"), t("empathy2"), t("empathy3")];

  const encouragement =
    empathyStatements[currentAmount % empathyStatements.length];
  const newAmount = currentAmount + 75;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-accent">
              <Heart className="h-6 w-6" />
              <p className="font-semibold uppercase tracking-wide text-xs">
                {t("yourCareMatters")}
              </p>
            </div>

            <h2 className="mt-4 text-3xl font-serif text-foreground">
              {t("stayWithHer")}
            </h2>

            <p className="mt-3 text-base text-muted-foreground">
              {t("encouragementText", {
                currentAmount: formatCurrency(currentAmount),
                additionalAmount: formatCurrency(75),
              })}
            </p>

            <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-4">
              <p className="text-sm font-semibold text-foreground">
                {t("extraBenefitsTitle")}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• {t("benefit1")}</li>
                <li>• {t("benefit2")}</li>
                <li>• {t("benefit3")}</li>
              </ul>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              {t("togetherText", {
                currentAmount: formatCurrency(currentAmount),
                newAmount: formatCurrency(newAmount),
              })}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1" size="lg" onClick={onAccept}>
                {t("makeChange")}
              </Button>
              <Button
                className="flex-1"
                size="lg"
                variant="outline"
                onClick={onDecline}
              >
                {t("keepCurrent", { amount: formatCurrency(currentAmount) })}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpsellModal;
