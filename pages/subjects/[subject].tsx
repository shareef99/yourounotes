import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import details from "../../public/details.json";
import EditPopup from "../../components/user/EditPopup";
import DeletePopup from "../../components/user/DeletePopup";
import { Note } from "../admin/[user]";
import { Spinner } from "@chakra-ui/spinner";
import { primary } from "../../helpers/colors";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Props {
  sem: string;
  subject: string;
  group: string;
  notes: Array<Note>;
  subjects: Array<string>;
}

const SubjectNotes = ({ sem, group, subject, notes, subjects }: Props) => {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();

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

  const copyHandler = () => {
    const urlSubject = subject.replaceAll(" ", "%20");

    navigator.clipboard.writeText(
      `https://yourounotes.vercel.app/subjects/${urlSubject}?sem=${sem}&group=${group}`
    );
    showNotification({
      title: "Link copied ✨",
      message: "Share this link with your mates",
      state: "success",
    });
  };

  const copyNoteHandler = (noteUrl: string) => {
    navigator.clipboard.writeText(noteUrl);
    showNotification({
      title: "Link copied ✨",
      message: "Share this link with your mates",
      state: "success",
    });
  };

  return (
    <>
      <Head>
        <title>{subject} | Your OU Notes</title>
        {/* Google Auto Ad Link */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7019308769438850"
          crossOrigin="anonymous"
        ></script>
      </Head>
      {loading ? (
        <div className="colCenter" style={{ height: "calc(100vh - 288px)" }}>
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
        <section className="container">
          {notes.length === 0 && (
            <div className="colCenter px-8 py-4 h-64">
              <p>We don't have the notes of {subject}.</p>
            </div>
          )}
          {notes.map((note, index) => (
            <div className="colCenter my-14" key={index}>
              <div className="colCenter border-b-2 pb-4 space-y-4">
                <a
                  href={note.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium"
                >
                  {note.name}➚
                </a>
                <div>
                  <p className="text-btn">
                    Uploaded At:{" "}
                    <span className="text-para">{note.uploadedAt}</span>
                  </p>
                  <p className="text-btn">
                    Uploaded by: {"   "}
                    <span className="text-para">{note.uploadedBy}</span>
                  </p>
                  <p className="text-btn">
                    Type: {"   "}
                    <span className="text-para">{note.type}</span>
                  </p>
                  <p
                    className="text-btn cursor-pointer font-medium text-center my-2"
                    onClick={() => copyNoteHandler(note.url)}
                  >
                    Share this pdf
                  </p>
                </div>
                {currentUser && currentUser.name === note.uploadedBy && (
                  <div style={{ margin: "-10px" }}>
                    <DeletePopup
                      currentUserEmail={currentUser.email}
                      note={note}
                    />
                    <EditPopup
                      currentUserEmail={currentUser.email}
                      note={note}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="colCenter">
            <ul className="mt-4 mb-8 space-y-2 ">
              <li className="font-semibold text-2xl">Similar Subjects</li>
              {subjects?.map((subject, index) => (
                <li key={index} className="list-item list-disc">
                  <Link href={`/subjects/${subject}?sem=${sem}&group=${group}`}>
                    <a>{subject}</a>
                  </Link>
                </li>
              ))}
              <li className="list-item list-disc font-medium underline">
                <Link href="/subjects">All Subjects</Link>
              </li>
              <li
                className="list-item list-disc font-medium cursor-pointer"
                onClick={copyHandler}
              >
                Share this page
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default SubjectNotes;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const { subject, sem, group }: any = query;

  async function getNotes(type: string) {
    let tempNotes = [];
    try {
      const notesSnapshot = await getDocs(
        collection(db, "subjects", subject, type)
      );
      notesSnapshot.forEach((doc) => {
        tempNotes.push({ ...doc.data(), id: doc.id });
      });
    } catch (err) {
      console.log(err.message || err);
    }
    return tempNotes;
  }

  let notes = await getNotes("notes");
  let questionPapers = await getNotes("important questions");
  let impQuestions = await getNotes("question papers");
  let syllabus = await getNotes("syllabus");

  let allNotes: Array<Note> = [
    ...notes,
    ...questionPapers,
    ...impQuestions,
    ...syllabus,
  ]
    ?.filter((x) => x.name)
    ?.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

  const subjects = details
    .find((x) => x.sem === sem && x.group === group)
    .subjects.filter((y) => y !== subject);

  return {
    props: {
      sem,
      group,
      subject,
      notes: allNotes,
      subjects,
    },
  };
};
