"use client";

import { motion } from "framer-motion";
import { Download, Share2, Facebook, MessageCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CERTIFICATE_TIERS,
  generateCertificateId,
  generateShareText,
  type CertificateTier,
} from "@/lib/donation-utils";
import {
  generateCertificatePDF,
  downloadCertificatePDF,
} from "@/lib/certificate-generator";
import { useEffect, useState } from "react";

interface CertificateProps {
  donorName: string;
  amount: number;
  impactDescription: string;
  tier: CertificateTier;
  onClose?: () => void;
  variant?: "modal" | "inline";
}

export default function Certificate({
  donorName,
  amount,
  impactDescription,
  tier,
  onClose,
  variant = "modal",
}: CertificateProps) {
  const isModalVariant = variant === "modal";
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const certificateData = CERTIFICATE_TIERS[tier];
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!certificateId) {
      setCertificateId(generateCertificateId());
    }
  }, [certificateId]);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      // Generate the certificate PDF
      if (!certificateId) {
        alert(
          "Your certificate is still loading. Please try again in a moment."
        );
        return;
      }

      const pdfBytes = await generateCertificatePDF({
        donorName: donorName || "Anonymous Supporter",
        amount,
        date,
        impactStatement: impactDescription,
        certificateId,
        tier,
      });

      // Download the PDF
      downloadCertificatePDF(pdfBytes, certificateId);
    } catch (error) {
      console.error("Failed to generate certificate:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = (platform: "facebook" | "instagram" | "messages") => {
    const shareText = generateShareText(amount, tier);
    const encodedText = encodeURIComponent(shareText);

    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}&quote=${encodedText}`;
        break;
      case "instagram":
        // Instagram doesn't have a web share URL, so we copy to clipboard
        navigator.clipboard.writeText(shareText);
        alert(
          "Share text copied to clipboard! Open Instagram to paste and share."
        );
        return;
      case "messages":
        url = `sms:?&body=${encodedText}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  const textColor = "#464375";
  const accentColor = "#6f5ed3";
  const certificateTitle = certificateData.title.replace(" Certificate", "");
  const displayCertificateId = certificateId ?? "SOA-XXXXXX-XXXX";

  const certificateCard = (
    <motion.div
      initial={{ scale: 0.8, y: 50, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
      className={`relative w-full ${
        isModalVariant ? "max-w-3xl" : "max-w-4xl"
      }`}
      onClick={
        isModalVariant
          ? (e) => {
              e.stopPropagation();
            }
          : undefined
      }
    >
      <Card className="relative w-full overflow-visible rounded-[40px] border border-[#dcd2ff] bg-[#f8f5ff]/90 p-4 sm:p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="relative rounded-[32px] border border-[#d8c8ae] bg-[#f9f4e7] shadow-xl">
            <div className="relative aspect-[11/8.5]">
              <div
                className="pointer-events-none absolute inset-3 sm:inset-5 rounded-[28px] sm:rounded-[36px] opacity-95 z-0"
                style={{
                  backgroundImage: "url('/certificateborder.png')",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div
                className="pointer-events-none absolute inset-3 sm:inset-5 flex items-center justify-center z-10"
                aria-hidden="true"
              >
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: "url('/sheildofathenalogo.png')",
                    backgroundSize: "58%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    opacity: 0.05,
                    mixBlendMode: "multiply",
                    filter: "saturate(120%) contrast(1.02)",
                  }}
                />
              </div>

              <div className="relative z-20 h-full px-6 py-10 sm:px-12 sm:py-14 font-serif text-center space-y-8 text-[color:#464375] flex flex-col justify-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p
                    className="text-4xl md:text-5xl uppercase tracking-[0.3em]"
                    style={{ color: textColor }}
                  >
                    Certificate
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.6em] text-black">
                    {certificateTitle}
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-[0.5em] text-black">
                    This certificate is proudly presented to
                  </p>
                  <p
                    className="mt-4 text-4xl md:text-5xl tracking-[0.25em]"
                    style={{ color: textColor }}
                  >
                    {donorName.toUpperCase()}
                  </p>
                </motion.div>

                <div className="mx-auto h-[2px] w-48 bg-[#bdb9e5]" />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-lg leading-relaxed text-[#464375] max-w-2xl mx-auto">
                    In recognition of the outstanding generosity of
                    <span className="font-semibold">
                      {" "}
                      ${amount.toLocaleString()}
                    </span>
                    , which provided{" "}
                    <span className="font-semibold">{impactDescription}</span>
                    for women and children in need.
                  </p>
                  <p className="mt-4 text-base text-[#464375]">
                    Awarded on <span className="font-semibold">{date}</span>
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.4em] text-black">
                    Certificate ID: {displayCertificateId}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="pt-6"
                >
                  <div className="mx-auto h-[1px] w-56 bg-[#bdb9e5]" />
                  <p
                    className="mt-3 text-sm font-semibold"
                    style={{ color: textColor }}
                  >
                    Melpa Kamateros
                  </p>
                  <p className="text-xs uppercase tracking-[0.4em] text-black">
                    Executive Director
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative rounded-[32px] border border-[#dad6f1] bg-[#f6f3ff]/95 px-6 py-6 space-y-5 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleDownload}
                size="lg"
                className="gap-2 rounded-full px-8 text-base"
                style={{
                  background: "linear-gradient(135deg, #6f5ed3, #c088f4)",
                  color: "white",
                  boxShadow: "0 12px 30px rgba(111, 94, 211, 0.35)",
                }}
                disabled={isGenerating || !certificateId}
              >
                <Award className="h-5 w-5" />
                {isGenerating ? "Generating PDF..." : "Download Certificate"}
                <Download className="h-4 w-4" />
              </Button>

              <Button
                onClick={() => handleShare("facebook")}
                variant="outline"
                size="lg"
                className="gap-2 rounded-full px-8 text-base border-2"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                <Award className="h-5 w-5" />
                Share Your Impact
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-2 border-t border-[#e6dcc5]">
              <Button
                onClick={() => handleShare("facebook")}
                variant="ghost"
                size="sm"
                className="gap-2 text-[#5f5b97] hover:bg-[#ece9ff]"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>

              <Button
                onClick={() => handleShare("instagram")}
                variant="ghost"
                size="sm"
                className="gap-2 text-[#5f5b97] hover:bg-[#ece9ff]"
              >
                <Share2 className="h-4 w-4" />
                Instagram
              </Button>

              <Button
                onClick={() => handleShare("messages")}
                variant="ghost"
                size="sm"
                className="gap-2 text-[#5f5b97] hover:bg-[#ece9ff]"
              >
                <MessageCircle className="h-4 w-4" />
                Messages
              </Button>
            </div>

            {isModalVariant && onClose && (
              <div className="text-center pt-2">
                <Button
                  onClick={onClose}
                  variant="ghost"
                  className="text-[#5f5b97] hover:text-[#40368f]"
                >
                  Close & Continue
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );

  if (!isModalVariant) {
    return (
      <div className="relative w-full">
        <div
          className="absolute inset-0 rounded-[48px] blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(111, 94, 211, 0.28), transparent 65%), radial-gradient(circle at 70% 40%, rgba(192, 136, 244, 0.32), transparent 70%), radial-gradient(circle at 50% 80%, rgba(255, 158, 194, 0.25), transparent 75%)",
          }}
        />
        <div className="relative flex items-center justify-center px-4 md:px-8 py-10">
          {certificateCard}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      {/* Darkened backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Colored gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(251, 146, 60, 0.15) 0%, rgba(192, 132, 252, 0.15) 50%, rgba(253, 230, 138, 0.1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {certificateCard}
      </div>
    </motion.div>
  );
}
