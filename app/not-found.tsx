import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/core/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <FileQuestion className="h-24 w-24 text-muted-foreground" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>

        {/* Title */}
        <h2 className="mb-4 text-3xl font-semibold text-foreground">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-8 max-w-md text-lg text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. The page might
          have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
