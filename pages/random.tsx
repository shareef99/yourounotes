import Link from "next/link";
import details from "../public/details.json";

interface Props {}

const random = (props: Props) => {
    const subject = "Mathematics (M-I)";

    return (
        <div>
            <div>
                {details.map((x, index) => (
                    <div key={index} className="colCenter items-start my-10">
                        <h2 className="text-xl ">
                            {x.group}{" "}
                            {x.sem === "first"
                                ? "Ist"
                                : x.sem === "second"
                                ? "IInd"
                                : x.sem === "third"
                                ? "IIIrd"
                                : x.sem === "forth"
                                ? "IVth"
                                : ""}{" "}
                            sem
                        </h2>
                        <ul className="ml-8 mt-4 space-y-2">
                            {x.subjects.map((subject, index) => (
                                <li
                                    key={index}
                                    className="list-item list-disc "
                                >
                                    <Link
                                        href="subjects/[subject]"
                                        as={`subjects/${subject}`}
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
