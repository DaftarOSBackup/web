"use client";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/role-context";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function LoginPage() {
  const pathname = usePathname();
  const { setRole } = useRole();
  const role = pathname.includes("investor") ? "investor" : "founder";
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      setRole(role);
      await signIn("google", {
        callbackUrl: role === "investor" ? "/programs" : "/incubation",
        state: `${window.location.origin}${pathname}`,
      });
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to PitchOS</h1>
        <p className="text-gray-500">Sign in as {role}</p>
      </div>

      {!isLoading ? (
        <div className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>
        </div>
      ) : (
        <div className="py-8 text-center space-y-4">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Signing you in</p>
            <p className="text-sm text-muted-foreground">
              Please wait while we connect to Google...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
