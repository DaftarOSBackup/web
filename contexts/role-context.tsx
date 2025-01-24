"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type UserRole = "investor" | "founder" | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const { data: session, status } = useSession();

  // Load role from the session or localStorage when the provider mounts
  useEffect(() => {
    if (session?.user?.role) {
      setRole(session.user.role as UserRole);
    } else {
      const savedRole = localStorage.getItem("userRole") as UserRole;
      if (savedRole) {
        setRole(savedRole);
      }
    }
  }, [session]);

  // Save role to localStorage whenever it changes
  const handleSetRole = (newRole: UserRole) => {
    if (newRole) {
      setRole(newRole);
      localStorage.setItem("userRole", newRole);
    } else {
      localStorage.removeItem("userRole");
    }
  };

  const login = async (selectedRole: UserRole) => {
    if (!selectedRole) {
      console.error("Role is required for login");
      return;
    }
    handleSetRole(selectedRole);

    // Pass role in the `state` parameter for authentication
    await signIn("google", {
      state: JSON.stringify({ role: selectedRole }),
    });
  };

  const logout = async () => {
    handleSetRole(null); // Clear role
    await signOut();
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole: handleSetRole,
        isAuthenticated: status === "authenticated",
        login,
        logout,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
};
