import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import { Partytown } from "@builder.io/partytown/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <Partytown
          debug={true}
          resolveUrl={(url) => {
            const proxyDomains = ["www.googletagmanager.com"];
            if (proxyDomains.includes(url.hostname)) {
              const proxyUrl = new URL(
                "https://cdn.builder.io/api/v1/proxy-api"
              );
              proxyUrl.searchParams.append("url", url);
              return proxyUrl;
            }
          }}
          forward={["dataLayer.push", "_learnq.push", "ttq.track", "ttq.page"]}
          key="partytown"
        />

        <script src="/~partytown/debug/partytown.js"></script>
        <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
              partytown = {
                lib: "_next/static/~partytown/",
                debug: true,
                forward: ["gtag","clarity","freshpaint"]
              };
              `,
          }}
        />
        <Script
          strategy="worker"
          type="text/partytown"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS}`}
        />

        <Script strategy="worker" type="text/partytown">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.NEXT_PUBLIC_ANALYTICS});`}
        </Script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
