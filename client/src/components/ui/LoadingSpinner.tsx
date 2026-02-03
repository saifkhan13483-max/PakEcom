import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-primary">
      <Loader2 className="h-12 w-12 animate-spin mb-4" />
      <p className="text-muted-foreground font-medium animate-pulse">Loading amazing products...</p>
    </div>
  );
}
