"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SubscriptionFormProps {
  className?: string;
}

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
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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
          text: data.message || "Successfully subscribed!",
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
          text: data.message || "Failed to subscribe. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            type="email"
            placeholder="Your email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white dark:bg-gray-800"
          />
          <Input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-white dark:bg-gray-800"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            type="text"
            placeholder="First name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="bg-white dark:bg-gray-800"
          />
          <Input
            type="text"
            placeholder="Last name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="bg-white dark:bg-gray-800"
          />
        </div>
        <Input
          type="text"
          placeholder="Job title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="bg-white dark:bg-gray-800"
        />

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
              I would like to receive Terry email updates about important related news and other ways to continue my climate journey. This includes our monthly newsletter.*
            </label>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            You can unsubscribe later at any time.
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            By clicking submit below, you agree to the Terry <a href="https://www.terry.earth/terms-of-use" className="underline hover:text-[#25CF7A] transition-colors">Terms of use</a> and <a href="https://www.terry.earth/privacy" className="underline hover:text-[#25CF7A] transition-colors">Privacy Statement</a>
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full bg-[#141414] hover:bg-[#25CF7A] text-white font-semibold transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Subscribe"}
        </Button>

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
