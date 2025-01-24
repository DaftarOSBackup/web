import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // Add role to the session
            if (session.user) {
                session.user.role = token.role;
                role = token.role;
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            // Set initial role from URL when signing in
            if (account && profile) {
                try {
                    const url = new URL(account.state as string);
                    const path = url.pathname;
                    token.role = path.includes('investor') ? 'investor' : 'founder';
                } catch (error) {
                    token.role = 'investor'; // fallback default
                }
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            // Handle redirection after sign in
            if (url.startsWith(baseUrl)) {
                // If user is signing in through investor path, redirect to programs
                if (url.includes('/login/investor')) {
                    return `${baseUrl}/programs`;
                }
                // If user is signing in through founder path, redirect to incubation
                if (url.includes('/login/founder')) {
                    return `${baseUrl}/incubation`;
                }
            }
            return url;
        }
    }
});

export { handler as GET, handler as POST };