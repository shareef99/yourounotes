import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import fs from "fs";
import Link from "next/link";
interface Props {
    subject: string;
    subjectNotes: Array<string>;
}

const SubjectNote = ({ subject, subjectNotes }: Props) => {
    // console.log({ subject, subjectNotes });

    return (
        <div>
            <ul>
                {subjectNotes?.map((x) => (
                    <li key={x}>
                        <Link
                            href="/subjects/[subject]/[notes]"
                            as={`/subjects/${subject}/${x}`}
                        >
                            {x}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubjectNote;

export const getStaticPaths: GetStaticPaths = async () => {
    const subjects = fs.readdirSync("public/subjects");
    // console.log("====================================");
    console.log(subjects);
    // console.log("====================================");

    const paths = subjects.map((subject) => ({
        params: {
            subject: `${subject}`,
        },
    }));

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({
    params,
}: GetStaticPropsContext) => {
    const { subject } = params;
    const subjectNotes = fs.readdirSync(`public/subjects/${subject}`);

    // console.log("====================================");
    // console.log({ subject, subjectNotes });
    // console.log("====================================");

    return {
        props: {
            subject,
            subjectNotes,
        },
    };
};
