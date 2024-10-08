'use client';

import type { AppProps } from 'next/app'
import RootLayout from "@/components/layout";
import "@/components/globals.css";
import Head from "next/head";


export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <RootLayout>
        <Head>
          <meta name="application-name" content="DFTL!"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="apple-mobile-web-app-title" content="DFTL!"/>
          <meta name="description" content="Don't Forget The Lime!"/>
          <meta name="format-detection" content="telephone=no"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="msapplication-config" content="/icons/browserconfig.xml"/>
          <meta name="msapplication-TileColor" content="#2B5797"/>
          <meta name="msapplication-tap-highlight" content="no"/>
          <meta name="theme-color" content="#000000"/>

          <link rel="apple-touch-icon" href="/logo192.png"/>
          <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png"/>

          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>

          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:url" content="https://dftl.nicolasbigler.com"/>
          <meta name="twitter:title" content="DFTL!"/>
          <meta name="twitter:description" content="Don't Forget The Lime!"/>
          <meta name="twitter:image" content="https://dftl.nicolasbigler.com/icons/android-chrome-192x192.png"/>
          <meta name="twitter:creator" content="@nbigler"/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content="DFTL!"/>
          <meta property="og:description" content="Don't Forget The Lime!"/>
          <meta property="og:site_name" content="DFTL!"/>
          <meta property="og:url" content="https://dftl.nicolasbigler.com"/>
          <meta property="og:image" content="https://dftl.nicolasbigler.com/icons/apple-touch-icon.png"/>


          {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />*/}
          {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />*/}
          {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />*/}
          {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />*/}
          {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />*/}
          {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />*/}
          {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />*/}
        </Head>
        <Component {...pageProps} />
      </RootLayout>
    </>
  )
}