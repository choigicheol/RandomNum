import "./global.css";
import "semantic-ui-css/semantic.min.css";
import { useCallback, useEffect, useState } from "react";
import { AppProps } from "next/app";
import Top from "@/components/Top";
import NumberContext from "../components/context/ResultContext";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import Head from "next/head";
import { DetailedHTMLProps, ScriptHTMLAttributes } from "react";

interface CustomScriptProps
  extends DetailedHTMLProps<
    ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  > {
  crossorigin?: string;
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const [numbers, setNumbers] = useState<number[][]>([]);

  const addNumbers = (arr: number[]) => {
    setNumbers((prev) => [arr, ...prev]);
  };

  const resetNumbers = () => {
    setNumbers([]);
  };

  const deleteNumbers = (idx: number): void => {
    setNumbers(numbers.filter((el, index) => idx !== index));
  };
  const scriptProps = {
    async: true,
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5506839171114662",
    crossorigin: "anonymous",
  };

  // Usage

  return (
    <>
      <Head>
        <script {...scriptProps} />;
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />

      <div className="container">
        <div className="center">
          <Top />
          <NumberContext.Provider
            value={{ numbers, addNumbers, resetNumbers, deleteNumbers }}
          >
            <Component {...pageProps} />
          </NumberContext.Provider>
          <Footer />
        </div>
        <style jsx>{`
          .container {
            display: flex;
            width: 100%;
            justify-content: center;
            /* background-color: #ffffff; */
          }
          .center {
            /* max-width: 1000px; */
            width: 100%;
            /* background-color: #000000; */
          }
        `}</style>
      </div>
    </>
  );
}

export default App;
