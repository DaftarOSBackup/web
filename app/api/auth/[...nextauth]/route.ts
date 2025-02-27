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
                session.user.email = token.email as string | undefined;
                if (session.user.email === "daftarosbackup@gmail.com") {
                    session.user.role = "investor"
                }
                else {
                    session.user.role = "founder"
                }
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                try {
                    // Determine which API to call dynamically
                    const endpoint = `https://2939-14-139-122-17.ngrok-free.app/auth/get-role/`;

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
                        if (token.email === "daftarosbackup@gmail.com") {
                            token.role = "investor"
                        }
                        else {
                            token.role = "founder"
                        }
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
            return `${baseUrl}`;
        },
    },
});

export { handler as GET, handler as POST };
