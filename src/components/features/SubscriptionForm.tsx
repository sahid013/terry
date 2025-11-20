"use client";

import { useState, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SubscriptionFormProps {
  className?: string;
}

const translations = {
  en: {
    email: "Email",
    company: "Company",
    firstName: "First name",
    lastName: "Last name",
    jobTitle: "Job title",
    agreeText: "I would like to receive Terry email updates about important related news and other ways to continue my climate journey. This includes our monthly newsletter.*",
    unsubscribeText: "You can unsubscribe later at any time.",
    submitButton: "Subscribe",
    processing: "Processing...",
    successMessage: "Successfully subscribed!",
    errorMessage: "Failed to subscribe. Please try again.",
  },
  nl: {
    email: "E-mail",
    company: "Bedrijf",
    firstName: "Voornaam",
    lastName: "Achternaam",
    jobTitle: "Functietitel",
    agreeText: "Ik wil graag Terry e-mailupdates ontvangen over belangrijk gerelateerd nieuws en andere manieren om mijn klimaatreis voort te zetten. Dit omvat onze maandelijkse nieuwsbrief.*",
    unsubscribeText: "U kunt zich later op elk moment afmelden.",
    submitButton: "Abonneren",
    processing: "Verwerken...",
    successMessage: "Succesvol geabonneerd!",
    errorMessage: "Abonneren mislukt. Probeer het opnieuw.",
  },
};

/**
 * Subscription form component for OneSignal integration
 * Collects email and name for push notification subscription
 */
export default function SubscriptionForm({ className }: SubscriptionFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [agreeToUpdates, setAgreeToUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "nl">("en");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Detect language from parent URL when embedded in iframe
  useEffect(() => {
    try {
      // Check if embedded in iframe
      if (window.self !== window.top) {
        // Get parent URL from document.referrer
        const referrer = document.referrer;
        if (referrer && referrer.includes("/nl")) {
          setLanguage("nl");
        }
      }
    } catch (error) {
      // Cross-origin restriction, fallback to default language
      console.log("Could not detect parent URL");
    }
  }, []);

  const t = translations[language];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, lastName, company, jobTitle }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: data.message || t.successMessage,
        });
        setEmail("");
        setFirstName("");
        setLastName("");
        setCompany("");
        setJobTitle("");
        setAgreeToUpdates(false);
      } else {
        setMessage({
          type: "error",
          text: data.message || t.errorMessage,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: t.errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="email" className="block text-left text-[15px] font-bold text-gray-700 dark:text-gray-300 mb-1">
              {t.email} *
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white dark:bg-gray-800"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="company" className="block text-left text-[15px] font-bold text-gray-700 dark:text-gray-300 mb-1">
              {t.company}
            </label>
            <Input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-white dark:bg-gray-800"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-left text-[15px] font-bold text-gray-700 dark:text-gray-300 mb-1">
              {t.firstName} *
            </label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="bg-white dark:bg-gray-800"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-left text-[15px] font-bold text-gray-700 dark:text-gray-300 mb-1">
              {t.lastName} *
            </label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-white dark:bg-gray-800"
            />
          </div>
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-left text-[15px] font-bold text-gray-700 dark:text-gray-300 mb-1">
            {t.jobTitle}
          </label>
          <Input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-3 py-2">
          <div className="flex items-start gap-2 justify-center">
            <input
              type="checkbox"
              id="agreeToUpdates"
              checked={agreeToUpdates}
              onChange={(e) => setAgreeToUpdates(e.target.checked)}
              required
              className="mt-1 w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-[#25CF7A] accent-[#25CF7A]"
            />
            <label htmlFor="agreeToUpdates" className="text-sm text-gray-700 dark:text-gray-300">
              {t.agreeText}
            </label>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {t.unsubscribeText}
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="px-8 bg-[#141414] hover:bg-[#25CF7A] text-white font-semibold transition-colors duration-300"
            disabled={isLoading}
          >
            {isLoading ? t.processing : t.submitButton}
          </Button>
        </div>

        {message && (
          <div
            className={cn(
              "p-3 rounded-lg text-sm",
              message.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            )}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
