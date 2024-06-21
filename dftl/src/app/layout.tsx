'use client';

import {Inter} from "next/font/google";
import "./globals.css";
import {Container, CssBaseline} from "@mui/material";
import Header from "../components/Header";
import {Amplify} from "aws-amplify";
import awsconfig from "@/app/awsconfig";
import {Authenticator} from "@aws-amplify/ui-react";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

// @ts-ignore
Amplify.configure(awsconfig, {ssr: true});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Authenticator  socialProviders={['google']}>
            <Header/>
            <CssBaseline/>
            <Container maxWidth="md">
              {children}
            </Container>
          </Authenticator>
        </body>
      </html>
    </>
  );
}