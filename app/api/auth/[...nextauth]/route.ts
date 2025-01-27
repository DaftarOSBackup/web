import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile",
                },
            },
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/login', // Redirect to home page for sign in
    },
    callbacks: {
        async session({ session, token }) {
            // Add role and access token to the session
            if (session.user) {
                session.user.role = token.role as "investor" | "founder" | null;
                session.accessToken = token.accessToken as string | undefined;
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                try {
                    // Determine which API to call dynamically
                    const endpoint = `${process.env.BASE_URL}/auth/get-role/`;

                    // Call the API to determine the user's role
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id_token: account.id_token, // Pass the ID token
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json() as { access_token: string; role: string };

                        // Dynamically assign the role and access token
                        token.accessToken = data.access_token;
                        token.role = data.role === "investor" || data.role === "founder" ? data.role : null;
                    } else {
                        console.error("Failed to fetch role:", response.statusText);
                        token.role = null;
                    }
                } catch (error) {
                    console.error("Authentication error:", error);
                    token.role = null;
                }
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            // Handle role-based redirects
            if (url.includes('/login/investor')) {
                return `${baseUrl}/programs`;
            }
            if (url.includes('/login/founder')) {
                return `${baseUrl}/incubation`;
            }

            // Default fallback to landing page
            return `${baseUrl}/landing`;
        },
    },
});

export { handler as GET, handler as POST };
