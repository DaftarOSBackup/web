"use client";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api-client";

export function ExampleComponent() {
  const { data: session } = useSession();

  const fetchCollaborations = async () => {
    try {
      const collaborations = await api.getCollaborationRequests("1");
      console.log(collaborations);
    } catch (error) {
      console.error("Failed to fetch collaborations:", error);
    }
  };

  // Use in your component
  return (
    <button onClick={fetchCollaborations}>
      Fetch Collaborations
    </button>
  );
} 