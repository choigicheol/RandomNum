import "./global.css";
import "semantic-ui-css/semantic.min.css";
import ResultContext from "../components/context/ResultContext";
import WindowWidthContext from "@/components/context/WindowWidthContext";
import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Top from "@/components/Top";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  const [numbers, setNumbers] = useState<number[][]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const router = useRouter();

  const addNumbers = (arr: number[]) => {
    setNumbers((prev) => [arr, ...prev]);
  };

  const resetNumbers = () => {
    setNumbers([]);
  };

  const deleteNumbers = (idx: number): void => {
    setNumbers(numbers.filter((el, index) => idx !== index));
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 구글 에널리틱스
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

  const scriptProps = {
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5506839171114662",
    crossorigin: "anonymous",
  };

  return (
    <>
      <Head>
        <Script async {...scriptProps} />;
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

      <Top />
      <div className="container">
        <WindowWidthContext.Provider value={{ windowWidth }}>
          <ResultContext.Provider
            value={{ numbers, addNumbers, resetNumbers, deleteNumbers }}
          >
            <Component {...pageProps} />
          </ResultContext.Provider>
        </WindowWidthContext.Provider>
      </div>
      <Footer />
      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          min-height: 100vh;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}

export default App;
