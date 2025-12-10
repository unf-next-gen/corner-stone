import { Navbar } from "@/global/components/navbar";
import "@/global/styles/globals.css";
import { theme } from "@/global/styles/mantine-theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corner Stone",
  description: "Corner Stone Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&family=Lexend:wght@100..900&family=Outfit:wght@100..900&family=Young+Serif&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme}>
          <Notifications />
          <div className="grid grid-cols-[80px_1fr] min-h-screen">
            <Navbar />
            <main className="col-start-2">{children}</main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
