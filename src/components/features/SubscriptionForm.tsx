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
        <div className="flex gap-3">
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
        <div className="flex gap-3">
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

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        By subscribing, you agree to receive notifications and updates.
      </p>
    </div>
  );
}
