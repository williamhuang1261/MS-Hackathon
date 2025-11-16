"use client";

import { formatCurrency } from "@/lib/donation-utils";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Shield, Lock } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  selectedTier: number | null;
  customAmount: number;
  impact: {
    description: string;
  };
  handlePaymentSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
  paymentMethod: string;
  setPaymentMethod: (
    method: "card" | "googlepay" | "applepay" | "paypal"
  ) => void;
  donorInfo: {
    name: string;
    email: string;
    isReturning: boolean;
  };
  setDonorInfo: (
    info: React.SetStateAction<{
      name: string;
      email: string;
      isReturning: boolean;
    }>
  ) => void;
  paymentInfo: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  handlePaymentInputChange: (field: string, value: string) => void;
  paymentErrors: {
    [key: string]: string;
  };
  setPaymentErrors: (
    errors: React.SetStateAction<{
      [key: string]: string;
    }>
  ) => void;
}

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  selectedTier,
  customAmount,
  impact,
  handlePaymentSubmit,
  isProcessing,
  paymentMethod,
  setPaymentMethod,
  donorInfo,
  setDonorInfo,
  paymentInfo,
  handlePaymentInputChange,
  paymentErrors,
  setPaymentErrors,
}: Props) => {
  return (
    <AnimatePresence>
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handlePaymentSubmit}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Complete Your Donation
                </CardTitle>
                <CardDescription>
                  Donating {formatCurrency(selectedTier || customAmount)} •
                  Secure payment powered by Stripe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "card"
                          ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="font-medium">Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("googlepay")}
                      className={`flex items-center justify-center rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "googlepay"
                          ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <img
                        src="/icons/googlepay.svg"
                        alt="Google Pay"
                        className="h-6"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("applepay")}
                      className={`flex items-center justify-center rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "applepay"
                          ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <img
                        src="/icons/applepay.svg"
                        alt="Apple Pay"
                        className="h-6"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`flex items-center justify-center rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "paypal"
                          ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <img
                        src="/icons/paypal.svg"
                        alt="PayPal"
                        className="h-6"
                      />
                    </button>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={donorInfo.name}
                        onChange={(e) => {
                          setDonorInfo({
                            ...donorInfo,
                            name: e.target.value,
                          });
                          if (paymentErrors.name)
                            setPaymentErrors({ ...paymentErrors, name: "" });
                        }}
                        placeholder="John Doe"
                        className={
                          paymentErrors.name ? "border-destructive" : ""
                        }
                      />
                      {paymentErrors.name && (
                        <p className="text-sm text-destructive">
                          {paymentErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={donorInfo.email}
                        onChange={(e) => {
                          setDonorInfo({
                            ...donorInfo,
                            email: e.target.value,
                          });
                          if (paymentErrors.email)
                            setPaymentErrors({ ...paymentErrors, email: "" });
                        }}
                        placeholder="john@example.com"
                        className={
                          paymentErrors.email ? "border-destructive" : ""
                        }
                      />
                      {paymentErrors.email && (
                        <p className="text-sm text-destructive">
                          {paymentErrors.email}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Receipt will be sent to this email
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="returning"
                        checked={donorInfo.isReturning}
                        onCheckedChange={(checked: boolean) =>
                          setDonorInfo({
                            ...donorInfo,
                            isReturning: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="returning"
                        className="cursor-pointer text-sm"
                      >
                        I'm a returning donor
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Card Information - Only show for card payments */}
                {paymentMethod === "card" && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Card Information
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={(e) =>
                              handlePaymentInputChange(
                                "cardNumber",
                                e.target.value
                              )
                            }
                            placeholder="1234 5678 9012 3456"
                            className={
                              paymentErrors.cardNumber
                                ? "border-destructive"
                                : ""
                            }
                          />
                          {paymentErrors.cardNumber && (
                            <p className="text-sm text-destructive">
                              {paymentErrors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name *</Label>
                          <Input
                            id="cardName"
                            value={paymentInfo.cardName}
                            onChange={(e) =>
                              handlePaymentInputChange(
                                "cardName",
                                e.target.value
                              )
                            }
                            placeholder="John Doe"
                            className={
                              paymentErrors.cardName ? "border-destructive" : ""
                            }
                          />
                          {paymentErrors.cardName && (
                            <p className="text-sm text-destructive">
                              {paymentErrors.cardName}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={(e) =>
                                handlePaymentInputChange(
                                  "expiryDate",
                                  e.target.value
                                )
                              }
                              placeholder="MM/YY"
                              className={
                                paymentErrors.expiryDate
                                  ? "border-destructive"
                                  : ""
                              }
                            />
                            {paymentErrors.expiryDate && (
                              <p className="text-sm text-destructive">
                                {paymentErrors.expiryDate}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              type="password"
                              value={paymentInfo.cvv}
                              onChange={(e) =>
                                handlePaymentInputChange("cvv", e.target.value)
                              }
                              placeholder="123"
                              className={
                                paymentErrors.cvv ? "border-destructive" : ""
                              }
                            />
                            {paymentErrors.cvv && (
                              <p className="text-sm text-destructive">
                                {paymentErrors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Billing Address */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Billing Address
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            value={paymentInfo.address}
                            onChange={(e) =>
                              handlePaymentInputChange(
                                "address",
                                e.target.value
                              )
                            }
                            placeholder="123 Main Street"
                            className={
                              paymentErrors.address ? "border-destructive" : ""
                            }
                          />
                          {paymentErrors.address && (
                            <p className="text-sm text-destructive">
                              {paymentErrors.address}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={paymentInfo.city}
                              onChange={(e) =>
                                handlePaymentInputChange("city", e.target.value)
                              }
                              placeholder="New York"
                              className={
                                paymentErrors.city ? "border-destructive" : ""
                              }
                            />
                            {paymentErrors.city && (
                              <p className="text-sm text-destructive">
                                {paymentErrors.city}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              value={paymentInfo.state}
                              onChange={(e) =>
                                handlePaymentInputChange(
                                  "state",
                                  e.target.value
                                )
                              }
                              placeholder="NY"
                              className={
                                paymentErrors.state ? "border-destructive" : ""
                              }
                            />
                            {paymentErrors.state && (
                              <p className="text-sm text-destructive">
                                {paymentErrors.state}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={paymentInfo.zipCode}
                            onChange={(e) =>
                              handlePaymentInputChange(
                                "zipCode",
                                e.target.value
                              )
                            }
                            placeholder="10001"
                            className={`max-w-[200px] ${
                              paymentErrors.zipCode ? "border-destructive" : ""
                            }`}
                          />
                          {paymentErrors.zipCode && (
                            <p className="text-sm text-destructive">
                              {paymentErrors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Alternative Payment Method Messages */}
                {paymentMethod === "googlepay" && (
                  <div className="text-center py-8 space-y-4">
                    <img
                      src="/icons/googlepay.svg"
                      alt="Google Pay"
                      className="h-12 mx-auto"
                    />
                    <div>
                      <p className="text-lg font-semibold mb-2">
                        Complete with Google Pay
                      </p>
                      <p className="text-sm text-muted-foreground">
                        You'll be redirected to complete your donation securely
                        with Google Pay.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "applepay" && (
                  <div className="text-center py-8 space-y-4">
                    <img
                      src="/icons/applepay.svg"
                      alt="Apple Pay"
                      className="h-12 mx-auto"
                    />
                    <div>
                      <p className="text-lg font-semibold mb-2">
                        Complete with Apple Pay
                      </p>
                      <p className="text-sm text-muted-foreground">
                        You'll be redirected to complete your donation securely
                        with Apple Pay.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="text-center py-8 space-y-4">
                    <img
                      src="/icons/paypal.svg"
                      alt="PayPal"
                      className="h-12 mx-auto"
                    />
                    <div>
                      <p className="text-lg font-semibold mb-2">
                        Complete with PayPal
                      </p>
                      <p className="text-sm text-muted-foreground">
                        You'll be redirected to complete your donation securely
                        with PayPal.
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Impact Summary */}
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Your Impact:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {impact.description}
                  </p>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </CardContent>
              <CardContent className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 flex items-center gap-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      {paymentMethod === "card"
                        ? `Donate ${formatCurrency(
                            selectedTier || customAmount
                          )}`
                        : `Continue to ${
                            paymentMethod === "googlepay"
                              ? "Google Pay"
                              : paymentMethod === "applepay"
                              ? "Apple Pay"
                              : "PayPal"
                          }`}
                    </>
                  )}
                </Button>
              </CardContent>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
