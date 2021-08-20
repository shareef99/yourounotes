import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { db } from "../../firebase/firebase";
import { Note } from "../admin/faculty/[faculty]";

interface Props {}

const SubjectNotes = ({}: Props) => {
    const router = useRouter();
    const subject = router.query.subject as string;
    const types: Array<string> = [
        "notes",
        "important questions",
        "question papers",
        "syllabus",
    ];

    const [notes, setNotes] = useState<Array<Note>>([]);

    useEffect(() => {
        types.forEach((type) => {
            db.collection("subjects")
                .doc(subject)
                .collection(type)
                .onSnapshot((snap) => {
                    setNotes((prevNotes) => [
                        ...prevNotes,
                        ...snap.docs.map((doc) => ({
                            name: doc.data().name,
                            subject: doc.data().subject,
                            type: doc.data().type,
                            uploadedAt: doc.data().uploadedAt,
                            uploadedBy: doc.data().uploadedBy,
                            url: doc.data().url,
                            id: doc.id,
                        })),
                    ]);
                });
        });
    }, []);

    useEffect(() => {
        console.log(notes);
    }, [notes]);

    return (
        <>
            <Head>
                <title>{subject} | Your OU Notes</title>
                <meta
                    name="keywords"
                    content={`${subject}, ${subject} question papers, ${subject} important questions,
                    ${subject} syllabus, ${subject} notes, isl, notes, engineering, shareef,
                    shareef99, ou, be, question papers, osmania university students, ou students,
                    engineering notes, be notes, important questions, be syllabus`}
                />
            </Head>
            <section className="container">
                {notes.filter((x) => x.name).length === 0 && (
                    <div className="colCenter h-screen -mt-16 px-8 py-4 space-y-4">
                        <p>
                            Sorry we don't have the notes of {subject} yet, We
                            will notify you once someone uploaded the notes
                        </p>
                    </div>
                )}
                {notes
                    .filter((x) => x.name)
                    .map((note, index) => (
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
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </>
    );
};

export default SubjectNotes;
