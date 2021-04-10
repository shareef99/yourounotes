import Head from "next/head";
import Main from "../components/Main";

export default function Home() {
    return (
        <>
            <Head>
                <title>YourNotes | Home</title>
                <meta name="keywords" content="isl notes engineering shareef" />
            </Head>
            <section>
                <Main />
            </section>
        </>
    );
}
