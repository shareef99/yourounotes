import axios from "axios";
import {
    GetStaticPaths,
    GetStaticPathsContext,
    GetStaticProps,
    GetStaticPropsContext,
} from "next";
import Link from "next/link";
import details from "../../../public/details.json";

interface Props {
    subject: string;
    pdfs: Array<any>;
}

const Sem3Subjects = ({ subject, pdfs }: Props) => {
    console.log(pdfs);

    return (
        <div>
            <ul>
                {pdfs?.map((pdf) => (
                    <li key={pdf.name}>
                        <Link
                            href="/sem3/[subject]/[notes]"
                            as={`/sem3/${subject}/${pdf.name}`}
                        >
                            {pdf.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sem3Subjects;

export const getStaticPaths: GetStaticPaths =
    async ({}: GetStaticPathsContext) => {
        const paths = details
            .filter((x) => x.sem === "third")
            .map((x) => {
                return {
                    params: {
                        subject: `${x.subjects}`,
                    },
                };
            });

        return {
            paths,
            fallback: true,
        };
    };

export const getStaticProps: GetStaticProps = async ({
    params,
}: GetStaticPropsContext) => {
    const { subject } = params;
    console.log("Subject = ", params.subject);

    const response = await axios.get(
        `https://api.github.com/repos/yourounotes/sem3/contents/CSE/${subject}`
    );

    const { data } = response;

    console.log("data = ", data);

    const pdfs = data;

    return {
        props: {
            subject,
            pdfs,
        },
    };
};
