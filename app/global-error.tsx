"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
          <div className="w-full max-w-2xl text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-red-100 p-6">
                <AlertCircle className="h-24 w-24 text-red-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Application Error
            </h1>

            {/* Description */}
            <p className="mb-8 text-lg text-gray-600">
              A critical error occurred. Please try refreshing the page.
            </p>

            {/* Error Details */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-8 rounded-lg border border-red-300 bg-red-50 p-6 text-left">
                <div className="mb-2 flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <h3 className="font-semibold">
                    Error Details (Development Only)
                  </h3>
                </div>
                <div className="mt-3">
                  <code className="block overflow-x-auto rounded bg-red-100 p-4 text-sm text-red-800">
                    {error.message}
                  </code>
                  {error.digest && (
                    <p className="mt-2 text-xs text-gray-600">
                      Error Digest: {error.digest}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              <RefreshCcw className="h-5 w-5" />
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
