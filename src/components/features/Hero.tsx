"use client";

import { cn } from "@/lib/utils";
import { BaseComponentProps } from "@/types";
import SubscriptionForm from "./SubscriptionForm";

interface HeroProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  showForm?: boolean;
}

/**
 * Hero component for displaying prominent messages
 */
export default function Hero({ title, subtitle, showForm = false, className }: HeroProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 text-center w-full",
        className
      )}
    >
      {title && (
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
          {subtitle}
        </p>
      )}
      {showForm && (
        <div className="w-full p-0">
          <SubscriptionForm />
        </div>
      )}
    </div>
  );
}
