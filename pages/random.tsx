import { useEffect } from "react";
import { db } from "../firebase/firebase";
import details from "../public/details.json";

interface Props {}

const random = (props: Props) => {
    useEffect(() => {
        const types: Array<string> = [
            "notes",
            "question papers",
            "important questions",
            "syllabus",
        ];
        let subjects: Array<string> = [];
        details.map((x) =>
            x.subjects.forEach((subject) => subjects.push(subject))
        );
        const sortedSubjects = subjects.sort();
        const bestSubjects = sortedSubjects.filter(
            (x, index, arr) => !index || x != arr[index - 1]
        );
        console.log(bestSubjects);
        const addSubjectsToFirebase = (subjects: Array<string>) => {
            subjects.map((subject) =>
                types.map((type) =>
                    db
                        .collection("subjects")
                        .doc(subject)
                        .collection(type)
                        .doc("bot")
                        .set({
                            message:
                                "I am a bot, and I maintain subjects collection",
                        })
                        .then((data) => console.log("done"))
                        .catch((err) => console.log(err.message))
                )
            );
        };
        addSubjectsToFirebase(bestSubjects);
    }, []);

    return (
        <div>
            {details?.map((x) =>
                x.subjects.map((subject, index) => {
                    return (
                        <h1 key={subject}>
                            {index}. {subject}
                        </h1>
                    );
                })
            )}
        </div>
    );
};

export default random;
