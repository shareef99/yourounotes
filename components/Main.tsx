import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {}

const Main = (props: Props) => {
    return (
        <section>
            <div
                id="hereSection"
                className="h-screen -mt-16 flex justify-around items-center flex-col 
                    md:flex-row-reverse w-full md:w-9/10 mx-auto bg-bottom-4
                    xs:bg-bottom bg-contain bg-clip-padding bg-no-repeat"
                style={{
                    backgroundImage: "url(/images/books.png)",
                }}
            >
                <div className="space-y-8 flex flex-col items-center h-screen relative">
                    <div
                        className="absolute top-[30%] xs:top-[35%] sm:top-[40%] md:top-[35%] w-max z-10 
                            opacity-100 bg-opacity-50 bg-bg rounded-md px-4"
                    >
                        <h1 className="text-2xl xs:text-4xl sm:text-5xl font-bold">
                            {/* Your needs in one place. */}
                            All "Your OU Notes" in one place.
                        </h1>
                    </div>
                    <div className="space-x-4 flexCenter sm:justify-start absolute bottom-56">
                        <Link href="/subjects">
                            <a
                                className="border-2 rounded-md px-3 py-2 bg-btn text-btnText
                                hover:text-heading hover:border-btn hover:bg-btnText
                                md:self-start text-lg font-semibold transition duration-500 
                                ease-in border-transparent"
                            >
                                Subjects
                            </a>
                        </Link>
                        <Link href="/about">
                            <a
                                className="border-2 rounded-md px-3 py-2 leading-7 
                                hover:bg-btn hover:text-btnText font-semibold
                                transition duration-500 ease-in w-max border-btn"
                            >
                                About US
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div id="how-it-work" className="container colCenter mb-14 mt-28">
                <h2 className="md:text-4xl my-14">HOW IT WORK</h2>
                <div
                    className="colCenter md:flex-row md:items-baseline md:justify-around
                        xl:justify-between flex-wrap"
                >
                    <div className="colCenter sm:max-w-xs">
                        <Image
                            src="/images/whatWeDo.png"
                            alt="Icon made by ultimatearm from flaticon"
                            width="100"
                            height="100"
                            className=""
                        />
                        <div className="">
                            <h3 className="text-center font-normal text-xl subHeadingSpace text-heading">
                                What we do?
                            </h3>
                            <p className="font-light text-base text-para">
                                we provide the notes, syllabus, previous year
                                question papers, Important questions for the
                                students of Bachelor of Engineering(BE).
                            </p>
                        </div>
                    </div>
                    <div className="colCenter my-14 md:mx-4 sm:max-w-xs">
                        <Image
                            src="/images/howWeDo.png"
                            width="100"
                            height="100"
                            alt="Icon made by Flat Icon from flatIcon"
                        />
                        <div className="">
                            <h3 className="text-center font-normal text-xl subHeadingSpace text-heading">
                                How we do?
                            </h3>
                            <p className="font-light text-base text-para">
                                We are students, we collect our resources from
                                our fellow students and some great teachers help
                                us with resources and we put all of them under
                                one root for better accessibility.
                            </p>
                        </div>
                    </div>
                    <div className="colCenter  sm:max-w-xs">
                        <Image
                            src="/images/WhatYouCanDo.png"
                            alt="Icon made by freepik from flatIcon"
                            width="100"
                            height="100"
                        />
                        <div className="">
                            <h3 className="text-center font-normal text-xl mb-4 mt-8 text-heading">
                                What you can do?
                            </h3>
                            <p className="font-light text-base text-para">
                                You can help us by providing the resources you
                                have and if you find any notes are missing or
                                miss leading you can report us. After all,
                                "Sharing is caring"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
