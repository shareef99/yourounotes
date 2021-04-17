import "../styles/globals.scss";
import "../styles/tailwind.css";
import { Layout } from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
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
            </Head>
            <Layout head>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
