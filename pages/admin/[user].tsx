import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import DeletePopup from "../../components/user/DeletePopup";
import EditPopup from "../../components/user/EditPopup";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { btnBackground, btnText, hoverBorderColor } from "../../helpers/colors";
import { getDocs, collection } from "firebase/firestore";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export interface Note {
  id: string;
  name: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  subject: string;
  type: string;
}

interface Props {
  notes: Array<Note>;
}

const DynamicUser = ({ notes }: Props) => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  return (
    <>
      <Head>
        <title>{currentUser?.name} | Your OU Notes</title>
        {/* Google Auto Ad Link */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7019308769438850"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <section className="my-14 container">
        <Heading mb={12}>Welcome {currentUser?.name}</Heading>
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="medium" mb={3}>
            Notes uploaded by you
          </Text>
          <ul className="flex flex-wrap">
            {notes?.map((note, index) => (
              <li
                key={index}
                className="bg-cardBg p-4 m-4 rounded-md shadow-md"
              >
                <div>
                  Name: {note.name}
                  <br />
                  URL:{" "}
                  <a target="_blank" href={note.url}>
                    Visit {note.name}
                  </a>
                  <br />
                  Uploaded at: {note.uploadedAt}
                  <br />
                  Subject: {note.subject}
                  <br />
                  Type: {note.type}
                </div>
                <div>
                  <DeletePopup
                    currentUserEmail={currentUser?.email}
                    note={note}
                  />
                  <EditPopup
                    note={note}
                    currentUserEmail={currentUser?.email}
                  />
                </div>
              </li>
            ))}
            {notes.length === 0 && (
              <li className="colCenter">
                <div className="m-2">
                  <Image src="/images/cactus.png" width="64" height="64" />
                </div>
                It's like a desert in here! <br /> You haven't uploaded any
                notes
              </li>
            )}
          </ul>
        </Box>
        <Flex className="space-x-2">
          <Button
            variant="solid"
            backgroundColor={btnBackground}
            textColor={btnText}
            _hover={{
              backgroundColor: hoverBorderColor,
              transitionProperty: "background-color, border-color, color",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)",
              transitionDuration: "500ms",
            }}
          >
            <Link href="/upload">Upload Notes</Link>
          </Button>
          <Button
            variant="solid"
            backgroundColor={btnBackground}
            textColor={btnText}
            _hover={{
              backgroundColor: hoverBorderColor,
              transitionProperty: "background-color, border-color, color",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)",
              transitionDuration: "500ms",
            }}
            onClick={() => {
              logout().then(() => {
                router.push("/");
              });
            }}
          >
            Log out
          </Button>
        </Flex>
      </section>
    </>
  );
};

export default DynamicUser;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const email = query.user as string;
  const notesSnapshot = await getDocs(
    collection(db, "uploaders", email, "notes")
  );
  let notes: Array<Note> = [];
  try {
    notesSnapshot.forEach((doc) =>
      notes.push({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        uploadedBy: doc.data().uploadedBy,
        uploadedAt: doc.data().uploadedAt,
        subject: doc.data().subject,
        type: doc.data().type,
      })
    );
  } catch (err) {
    console.log(err.message || err);
  }

  return {
    props: {
      notes,
    },
  };
};
