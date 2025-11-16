"use client";

import { motion, type MotionProps } from "framer-motion";
import { Download, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CERTIFICATE_TIERS,
  generateCertificateId,
  type CertificateTier,
} from "@/lib/donation-utils";
import {
  generateCertificatePDF,
  downloadCertificatePDF,
} from "@/lib/certificate-generator";
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type MouseEventHandler,
} from "react";
import { cn } from "@/lib/utils";

interface CertificateProps {
  donorName: string;
  amount: number;
  impactDescription: string;
  tier: CertificateTier;
  onClose?: () => void;
  variant?: "modal" | "inline";
  className?: string;
}

export default function Certificate({
  donorName,
  amount,
  impactDescription,
  tier,
  onClose,
  variant = "modal",
  className,
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

  type MotionDivProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    motionProps?: MotionProps;
    onClick?: MouseEventHandler<HTMLDivElement>;
  };

  const MotionDiv = ({
    children,
    className,
    style,
    motionProps,
    onClick,
  }: MotionDivProps) =>
    isModalVariant ? (
      <motion.div
        className={className}
        style={style}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.div>
    ) : (
      <div className={className} style={style} onClick={onClick}>
        {children}
      </div>
    );

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

  const textColor = "#464375";
  const certificateTitle = certificateData.title.replace(" Certificate", "");
  const displayCertificateId = certificateId ?? "SOA-XXXXXX-XXXX";

  const certificateWrapperClasses = cn(
    "relative w-full",
    isModalVariant ? "max-w-3xl" : "max-w-[1040px]",
    !isModalVariant && "h-full"
  );

  const certificateCanvasClasses = cn(
    "relative w-full",
    isModalVariant
      ? "aspect-[11/8.5]"
      : "min-h-[560px] lg:min-h-[640px] xl:min-h-[680px]"
  );

  const certificateBodyClasses = cn(
    "relative z-20 flex h-full w-full flex-col justify-center gap-8 px-6 py-10 font-serif text-center text-[color:#464375] sm:px-12 sm:py-14",
    !isModalVariant && "gap-10 px-10 py-14 sm:px-16 sm:py-16 lg:px-24"
  );

  const certificateCard = (
    <MotionDiv
      className={certificateWrapperClasses}
      motionProps={
        isModalVariant
          ? {
              initial: { scale: 0.8, y: 50, opacity: 0 },
              animate: { scale: 1, y: 0, opacity: 1 },
              transition: { type: "spring", duration: 0.8, delay: 0.2 },
            }
          : undefined
      }
      onClick={
        isModalVariant
          ? (e) => {
              e.stopPropagation();
            }
          : undefined
      }
    >
      <Card
        className={cn(
          "relative flex w-full flex-col overflow-visible rounded-3xl border-2 bg-white/95 p-6 sm:p-10 shadow-2xl",
          !isModalVariant && "h-full"
        )}
        style={{ borderColor: certificateData.color }}
      >
        <div className="flex h-full flex-col gap-8">
          <div className="relative rounded-[32px] border border-[#d8c8ae] bg-[#f9f4e7] p-3 sm:p-5 shadow-xl">
            <div className={certificateCanvasClasses}>
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

              <div className={certificateBodyClasses}>
                <MotionDiv
                  motionProps={
                    isModalVariant
                      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
                      : undefined
                  }
                >
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
                </MotionDiv>

                <div className="mx-auto h-[2px] w-48 bg-[#bdb9e5]" />

                <MotionDiv
                  motionProps={
                    isModalVariant
                      ? {
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          transition: { delay: 0.2 },
                        }
                      : undefined
                  }
                >
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#464375]">
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
                </MotionDiv>

                <MotionDiv
                  className="pt-6"
                  motionProps={
                    isModalVariant
                      ? {
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          transition: { delay: 0.35 },
                        }
                      : undefined
                  }
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
                </MotionDiv>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={handleDownload}
              size="lg"
              className="gap-2 rounded-full bg-accent px-8 py-3 text-base font-medium text-light-background shadow-[0_12px_30px_rgba(111,94,211,0.35)] transition hover:opacity-90"
              disabled={isGenerating || !certificateId}
            >
              <Award className="h-5 w-5" />
              {isGenerating ? "Generating PDF..." : "Download Certificate"}
              <Download className="h-4 w-4" />
            </Button>

            {isModalVariant && onClose && (
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-[#5f5b97] hover:text-[#40368f]"
              >
                Close & Continue
              </Button>
            )}
          </div>
        </div>
      </Card>
    </MotionDiv>
  );

  if (!isModalVariant) {
    return (
      <div className={cn("relative w-full", className)}>
        <div
          className="pointer-events-none absolute inset-0 rounded-[48px] blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(111, 94, 211, 0.28), transparent 65%), radial-gradient(circle at 70% 40%, rgba(192, 136, 244, 0.32), transparent 70%), radial-gradient(circle at 50% 80%, rgba(255, 158, 194, 0.25), transparent 75%)",
          }}
        />
        <div className="relative flex w-full items-center justify-center px-0 py-8 sm:px-4 lg:px-6 xl:px-8">
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
      className={cn("fixed inset-0 z-50", className)}
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
