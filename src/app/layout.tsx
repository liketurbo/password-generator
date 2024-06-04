import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator",
  description:
    "A plain password generator without ads or cookies, unlike LastPass.",
  keywords:
    "password generator, secure passwords, random password, LastPass alternative",
  openGraph: {
    title: "Password Generator",
    description:
      "A plain password generator without ads or cookies, unlike LastPass.",
    url: "https://password-generator.echohub.ru",
    type: "website",
    images: [
      {
        url: "https://password-generator.echohub.ru/og-image.png",
        width: 800,
        height: 600,
        alt: "Password Generator",
      },
    ],
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
