import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import "./globals.css";
import { frFR } from '@clerk/localizations'
import { cn } from "@/lib/utils";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});

export const metadata: Metadata = {
  title: "Editor App",
  description: "Editeur d'image en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider 
    afterSignOutUrl='/'
    appearance={{
      variables: { colorPrimary: '#624cf5'}
    }}
    localization={frFR}
    >
      <html lang="fr">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
        {/*   <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
