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
            // Add role to the session
            if (session.user) {
                session.user.role = token.role as "investor" | "founder" | null;
                // Add access token to session for API calls
                session.accessToken = token.accessToken as string | undefined;
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                try {
                    const role = "investor"; // Static role assignment
                    const endpoint = role == 'investor'
                        ? `${process.env.BASE_URL}/investor-login/investor-sign-in/`
                        : `${process.env.BASE_URL}/founder-login/google-sign-in/`;

                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id_token: account.id_token,
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json() as { access_token: string };
                        token.accessToken = data.access_token;
                        token.role = role;
                    }
                } catch (error) {
                    console.error('Authentication error:', error);
                    token.role = null;
                }
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            // If the user is not authenticated, redirect to landing page
            if (!url.startsWith(baseUrl)) {
                return baseUrl;
            }

            // For authenticated users, handle role-based redirects
            if (url.includes('/login/investor')) {
                return `${baseUrl}/programs`;
            }
            if (url.includes('/login/founder')) {
                return `${baseUrl}/incubation`;
            }

            // Default fallback to landing page
            return `${baseUrl}/landing`;
        }
    }
});

export { handler as GET, handler as POST };