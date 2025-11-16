"use client"

import { AnimatePresence } from "framer-motion";
import React from "react";
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
}

const CertificateReveal = ({
  showCertificate,
  setShowCertificate,
  donorInfo,
  completedDonation,
}: Props) => {
  return (
    <AnimatePresence>
      {showCertificate && completedDonation && (
        <Certificate
          donorName={donorInfo.name || "Anonymous Supporter"}
          amount={completedDonation.amount}
          impactDescription={completedDonation.impact}
          tier={completedDonation.tier}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default CertificateReveal;
