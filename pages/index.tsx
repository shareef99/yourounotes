import Head from "next/head";
import Main from "../components/Main";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/spinner";
import { primary } from "../helpers/colors";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
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

  return (
    <>
      <Head>
        <title>Your OU Notes | Home</title>
        <meta
          name="keywords"
          content="isl, notes, engineering, shareef, shareef99, ou, be, question papers, osmania university
                        students, ou students, engineering notes, be notes, important questions, be syllabus"
        />
        <meta
          name="google-site-verification"
          content="yTi3uLVOAq3UgoyLEOPMY8TipeXqPltkryXs122MOCw"
        />
        {/* Google Auto Ad Link */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7019308769438850"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <section>
        {loading ? (
          <div className="colCenter" style={{ height: "calc(100vh - 224px)" }}>
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
          <Main />
        )}
      </section>
    </>
  );
}
