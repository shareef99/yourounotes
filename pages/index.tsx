import Head from "next/head";
import Main from "../components/Main";

export default function Home() {
    return (
        <>
            <Head>
                <title>Your OU Notes | Home</title>
                <meta name="keywords" content="isl notes engineering shareef" />
            </Head>
            <section>
                <Main />
            </section>
        </>
    );
}
