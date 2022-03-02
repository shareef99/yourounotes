import React from "react";
import Image from "next/image";
import Head from "next/head";

interface Props {}

export type teamMember = {
  id: number;
  name: string;
  role: string;
  imgURL: string;
};

const about = (props: Props) => {
  const teamMembers: teamMember[] = [
    {
      id: 0,
      name: "Nadeem Shareef",
      role: "Designer and Coder",
      imgURL: "/images/team/nadeem.png",
    },
    {
      id: 1,
      name: "Noor Ahmed",
      role: "Ideas, Feedback",
      imgURL: "/images/team/noor.png",
    },
    {
      id: 2,
      name: "Nikhath Sultana",
      role: "Resources Provider",
      imgURL: "/images/team/nikhat.png",
    },
    {
      id: 3,
      name: "Shoaib Ahmed",
      role: "Ideas, Feedback",
      imgURL: "/images/team/shoaib.png",
    },
    {
      id: 4,
      name: "Mirza Baig",
      role: "Resources Provider",
      imgURL: "/images/team/mirza.png",
    },
  ];

  return (
    <>
      <Head>
        <title>About us | Your OU Notes</title>
        {/* Google Auto Ad Link */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7019308769438850"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <section>
        <div
          id="about-landing-section"
          className="h-screen -mt-16 bgGrad w-full flexCenter"
        >
          <div className="colCenter">
            <Image
              src="/images/teammate.png"
              width="256"
              height="230"
              priority={true}
              alt="Image by Yvette W from Pixabay"
            />
            <h3
              className="md:hidden leading-relaxed text-center mt-4 text-heading-dark 
                                w-[80%] md:w-full text-3xl font-bold tracking-wider"
            >
              We are students, determined to help students!
            </h3>
            <h2
              className="hidden md:block leading-relaxed text-center mt-4 
                            text-heading-dark w-[80%] md:w-full text-3xl font-bold tracking-wider"
            >
              We are students, determined to help students!
            </h2>
          </div>
        </div>
        <div
          id="about-details"
          className="container colCenter my-14 space-y-20 sm:space-y-30"
        >
          <h2 className="text-center">About US</h2>
          <div className="colCenter md:flex-row md:justify-between lg:w-[80%] mx-auto">
            <Image
              src="/images/missionImg.png"
              width="160"
              height="160"
              alt="Icons made by Freepik from Flaticon"
            />
            <div className="md:max-w-[70%] md:self-center">
              <h3
                className="text-center md:text-left subHeadingSpace md:mb-4 md:mt-0 
                                    font-medium text-2xl "
              >
                Our Mission
                <Image
                  src="/images/mission.png"
                  width="24"
                  height="24"
                  alt="Icons made by ultimatearm from Flaticon"
                  className=""
                />
              </h3>
              <p className="text-left font-light text-base leading-normal">
                Our mission is to make a platform powerful enough to supply
                everything a student needs in his/her BE journey
              </p>
            </div>
          </div>
          <div className="colCenter md:flex-row-reverse md:justify-between lg:w-[80%] mx-auto">
            <Image
              src="/images/targetImg.png"
              width="160"
              height="160"
              alt="Icons made by Pixel perfect from Flaticon"
            />
            <div className="md:max-w-[70%] md:self-center">
              <h3
                className="text-center md:text-left subHeadingSpace md:mb-4 md:mt-0
                                font-medium text-2xl"
              >
                Our Target
                <Image
                  src="/images/target.png"
                  width="24"
                  height="24"
                  alt="Icons made by Freepik from Flaticon"
                  className="pl-4"
                />
              </h3>
              <p className="text-left font-light text-base leading-normal">
                Our target is to provide as many notes and information we can,
                and go beyond our limits to help students
              </p>
            </div>
          </div>
        </div>
        <div id="our-team" className="container colCenter">
          <h2>Our Team</h2>
          <div className="my-14 flex justify-around sm:justify-between flex-wrap mx-auto">
            {teamMembers.map((teamMember) => (
              <div key={teamMember.id} className="p-8">
                <Image
                  src={teamMember.imgURL}
                  width="160"
                  height="160"
                  alt={teamMember.name}
                  priority={true}
                />
                <div className="text-center">
                  <h3 className="subHeadingSpace font-medium text-lg">
                    {teamMember.name}
                  </h3>
                  <p className="text-base">{teamMember.role}</p>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </section>
    </>
  );
};

export default about;
