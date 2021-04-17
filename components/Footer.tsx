import React from "react";
import Link from "next/link";

interface Props {}

const Footer = (props: Props) => {
    return (
        <footer id="footer" className="bg-gray-500">
            <div className="flexCenter">
                <ul
                    className="flex flex-wrap flex-col sm:flex-row justify-around items-start 
                        py-14 sm:space-x-8 space-y-8 sm:space-y-0"
                >
                    <li className="underline hover:no-underline">
                        <Link href="/about">
                            <a href="">Home</a>
                        </Link>
                    </li>
                    <li className="underline hover:no-underline">
                        <a
                            href="https://onlineounotes.web.app/pages/request"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Request Notes
                        </a>
                    </li>
                    <li className="underline hover:no-underline">
                        <Link href="/subjects">
                            <a href="">All Subjects</a>
                        </Link>
                    </li>
                    <li className="underline hover:no-underline">
                        <Link href="/about">
                            <a href="">About us</a>
                        </Link>
                    </li>
                    <li className="underline hover:no-underline">
                        <a
                            href="https://onlineounotes.web.app/pages/upload"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Upload Notes
                        </a>
                    </li>
                    <li className="underline hover:no-underline">
                        <a
                            href="https://github.com/shareef99/ounotes#your-notes"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-center pb-10">
                <p>
                    Design and Coded by{" "}
                    <a
                        href="https://portfolio.shareef.vercel.app/"
                        className="font-semibold underline hover:no-underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Shareef
                    </a>
                </p>
                <p>copyright © 2021 Nadeem Shareef</p>
            </div>
        </footer>
    );
};

export default Footer;
