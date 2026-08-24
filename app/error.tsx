"use client";

import { useEffect } from "react";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/core/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertCircle className="h-24 w-24 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          Something went wrong!
        </h1>

        {/* Description */}
        <p className="mb-8 text-lg text-muted-foreground">
          We're sorry, but something unexpected happened. Please try again or
          return to the home page.
        </p>

        {/* Error Details */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 rounded-lg border border-destructive bg-destructive/10 p-6 text-left">
            <div className="mb-2 flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-semibold">Error Details (Development Only)</h3>
            </div>
            <div className="mt-3">
              <code className="block overflow-x-auto rounded bg-destructive/10 p-4 text-sm text-destructive">
                {error.message}
              </code>
              {error.digest && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Error Digest: {error.digest}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} size="lg">
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
