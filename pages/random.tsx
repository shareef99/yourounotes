import Link from "next/link";
import details from "../public/details.json";

interface Props {}

const random = (props: Props) => {
    const subject = "Mathematics (M-I)";

    return (
        <div>
            <div>
                {details
                    .filter((x) => x.sem === "third")
                    .map((x, index) => (
                        <div
                            key={index}
                            className="colCenter items-start my-10"
                        >
                            <h2>{x.group}</h2>
                            <ul className="ml-8 mt-4 space-y-2">
                                {x.subjects.map((subject, index) => (
                                    <li
                                        key={index}
                                        className="list-item list-disc "
                                    >
                                        <Link
                                            href="/sem3/[subject]"
                                            as={`/sem3/${subject}`}
                                        >
                                            <a>{subject}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default random;
