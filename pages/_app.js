import "../styles/globals.css";
import "../styles/tailwind.css";
import { Layout } from "../components/Layout";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import NotificationProvider from "../context/NotificationContext";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            getAnalytics();
        }
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
            </Head>
            <AuthProvider>
                <NotificationProvider>
                    <ChakraProvider>
                        <Layout head>
                            <Component {...pageProps} />
                        </Layout>
                    </ChakraProvider>
                </NotificationProvider>
            </AuthProvider>
        </>
    );
}

export default MyApp;
