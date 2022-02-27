import { Heading, Text } from "@chakra-ui/layout";
import Head from "next/head";

interface Props {}

const PrivacyPolicy = (props: Props) => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Your OU Notes</title>
        {/* Google Auto Ad Link */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7019308769438850"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <section className="colCenter container">
        <Heading className="mt-8">Privacy Policy</Heading>
        <div className="my-32 space-y-4 md:w-3/5">
          <Text>
            By using yourounotes you are agreeing to yourounotes's privacy
            policy.
            <br />
            Yourounotes is not responsible if any pdf/document contains wrong
            information before following yourounotes's pdfs/documents first do
            your own research.
          </Text>
          <Text>
            If you find any of your pdf/document on yourounotes website, please
            email us at{" "}
            <a
              rel="stylesheet"
              href="mailto:yourounotes@gmail.com"
              className="font-medium"
            >
              yourounotes@gmail.com
            </a>
            , we will be happy to give credit(Put your name below pdf) to you.
          </Text>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
