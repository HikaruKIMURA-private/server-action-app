import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <ClerkProvider>
        <body lang="ja">
          <Header />
          <main>{children}</main>
        </body>
      </ClerkProvider>
    </html>
  );
}
