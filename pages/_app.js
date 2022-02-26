import "../styles/globals.css";
import "../styles/tailwind.css";
import { Layout } from "../components/Layout";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NotificationProvider from "../context/NotificationContext";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import Router from "next/router";
import { Spinner } from "@chakra-ui/spinner";
import { primary } from "../helpers/colors";

function MyApp({ Component, pageProps }) {
  const customLoadingPages = ["/subjects/[subject]", "/subjects"];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customLoadingPages.includes(Router.route)) return;

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  useEffect(() => {
    getAnalytics();
    getPerformance();
  }, []);

  return (
    <>
      <Head>
        <meta name="theme-color" content="#6246ea" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0"
        />
        <meta name="copyright" content="Nadeem Shareef" />
        <meta
          name="author"
          content="Nadeem Shareef, nadeemshareef934@gmail.com"
        />
        <meta name="designer" content="Nadeem Shareef" />
        <meta name="owner" content="Nadeem Shareef" />
        <meta
          name="description"
          content="It is a web platform that will provide everything a BE student needs It 
                        is built by the students for the students Our motive is to spread as much 
                        knowledge as we can in a best possible way Sharing is Caring. Design and 
                        Coded by Nadeem Shareef"
        />
        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
        {/* Google ad link */}
        <script
          data-ad-client="ca-pub-7019308769438850"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
      </Head>
      <AuthProvider>
        <NotificationProvider>
          <ChakraProvider>
            {loading ? (
              <div
                className="colCenter"
                style={{ height: "calc(100vh - 288px)" }}
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color={primary}
                  size="xl"
                  label="Loading...💫"
                />
              </div>
            ) : (
              <Layout head>
                <Component {...pageProps} />
              </Layout>
            )}
          </ChakraProvider>
        </NotificationProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
