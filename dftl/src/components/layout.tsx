'use client';

import {Inter} from "next/font/google";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "../components/Header";
import {Amplify} from "aws-amplify";
import awsconfig from "@/components/awsconfig";
import {Authenticator} from "@aws-amplify/ui-react";
import React from "react";
import {createTheme, responsiveFontSizes} from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

// @ts-ignore
Amplify.configure(awsconfig, {ssr: true});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <>
      <Authenticator  socialProviders={['google']}>
        <Header/>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
          <Container maxWidth="md">
            {children}
          </Container>
        </ThemeProvider>
      </Authenticator>
    </>
  );
}