"use client";

import { AnimatePresence } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";
import Certificate from "../Certificate";
import { CertificateTier } from "@/lib/certificate-generator";

interface Props {
  showCertificate: boolean;
  setShowCertificate: (show: boolean) => void;
  donorInfo: {
    name: string;
    email: string;
    isReturning: boolean;
  };
  completedDonation: {
    amount: number;
    impact: string;
    tier: CertificateTier;
  } | null;
  onClose?: () => void;
}

const CertificateReveal = ({
  showCertificate,
  setShowCertificate,
  donorInfo,
  completedDonation,
  onClose,
}: Props) => {
  const t = useTranslations("donation.certificate");

  return (
    <AnimatePresence>
      {showCertificate && completedDonation && (
        <Certificate
          donorName={donorInfo.name || t("anonymousSupporter")}
          amount={completedDonation.amount}
          impactDescription={completedDonation.impact}
          tier={completedDonation.tier}
          onClose={() => {
            setShowCertificate(false);
            onClose?.();
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default CertificateReveal;
