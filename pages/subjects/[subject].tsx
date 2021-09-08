import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { db } from "../../firebase/firebase";
import { Note } from "../admin/[user]";
import details from "../../public/details.json";
import EditPopup from "../../components/user/EditPopup";
import { useAuth } from "../../context/AuthContext";
import DeletePopup from "../../components/user/DeletePopup";
import {
    Popover,
    PopoverCloseButton,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
} from "@chakra-ui/popover";
import { btnBorder } from "../../helpers/colors";
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

    const copyHandler = () => {
        navigator.clipboard.writeText(
            `https://yourounotes.vercel.app/subjects/${subject}?sem=${sem}&group=${group}`
        );
    };

    const copyNoteHandler = (noteUrl: string) => {
        navigator.clipboard.writeText(noteUrl);
    };

    return (
        <>
            <Head>
                <title>{subject} | Your OU Notes</title>
            </Head>
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
                                    <span className="text-para">
                                        {note.uploadedAt}
                                    </span>
                                </p>
                                <p className="text-btn">
                                    Uploaded by: {"   "}
                                    <span className="text-para">
                                        {note.uploadedBy}
                                    </span>
                                </p>
                                <p className="text-btn">
                                    Type: {"   "}
                                    <span className="text-para">
                                        {note.type}
                                    </span>
                                </p>
                                <Popover>
                                    <PopoverTrigger>
                                        <p
                                            className="text-btn cursor-pointer font-medium text-center my-2"
                                            onClick={() =>
                                                copyNoteHandler(note.url)
                                            }
                                        >
                                            Share this pdf
                                        </p>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        borderColor={btnBorder}
                                        borderWidth="2px"
                                        _focus={{
                                            borderColor: btnBorder,
                                            borderWidth: "2px",
                                        }}
                                    >
                                        <PopoverCloseButton />
                                        <PopoverHeader>
                                            Link copied successfully
                                        </PopoverHeader>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {currentUser &&
                                currentUser.name === note.uploadedBy && (
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
                        <li className="font-semibold text-2xl">
                            Similar Subjects
                        </li>
                        {subjects?.map((subject, index) => (
                            <li key={index} className="list-item list-disc">
                                <Link
                                    href={`/subjects/${subject}?sem=${sem}&group=${group}`}
                                >
                                    <a>{subject}</a>
                                </Link>
                            </li>
                        ))}
                        <li className="list-item list-disc font-medium underline">
                            <Link href="/subjects">All Subjects</Link>
                        </li>
                        <Popover>
                            <PopoverTrigger>
                                <li
                                    className="list-item list-disc font-medium cursor-pointer"
                                    onClick={copyHandler}
                                >
                                    Share this page
                                </li>
                            </PopoverTrigger>
                            <PopoverContent
                                borderColor={btnBorder}
                                borderWidth="2px"
                                _focus={{
                                    borderColor: btnBorder,
                                    borderWidth: "2px",
                                }}
                            >
                                <PopoverCloseButton />
                                <PopoverHeader>
                                    Link copied successfully
                                </PopoverHeader>
                            </PopoverContent>
                        </Popover>
                    </ul>
                </div>
            </section>
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
                tempNotes.push(doc.data());
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
        ?.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        );

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
