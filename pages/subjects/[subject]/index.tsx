import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import fs from "fs";
import Link from "next/link";
import axios from "axios";
import PdfViewer from "../../../components/PdfViewer";
interface Props {
    subject: string;
    subjectNotes: Array<string>;
    data: any;
}

const SubjectNote = ({ subjectNotes, subject, data }: Props) => {
    console.log(data);

    return (
        <div>
            <ul>
                {subjectNotes &&
                    subjectNotes.map((x) => (
                        <li key={x}>
                            <Link
                                href="subjects/[subject]/[notes]"
                                as={`subjects/${subject}/${x}`}
                            >
                                {x}
                            </Link>
                        </li>
                    ))}
                {data &&
                    data.map((x) => (
                        <PdfViewer key={x.sha} url={x.download_url} />
                    ))}
            </ul>
        </div>
    );
};

export default SubjectNote;

export const getStaticPaths: GetStaticPaths = async () => {
    const subjects = fs.readdirSync("public/subjects");

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

    const response = await axios.get(
        "https://api.github.com/repos/shareef99/yournotes/contents/public/notes/Maths"
    );

    const { data } = response;

    console.log(response);

    console.log({ subject, subjectNotes });

    return {
        props: {
            subject,
            subjectNotes,
            data,
        },
    };
};
