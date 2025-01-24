import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "investor" | "founder";
    };
  }

  interface JWT {
    role?: "investor" | "founder";
  }
} 