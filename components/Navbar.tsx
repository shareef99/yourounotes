import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {}

const Navbar = (prop: Props) => {
    const [isAtTop, setIsAtTop] = useState<any>();
    const route = useRouter().route;

    const handleScroll = () => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 50) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }
        });
    };

    useEffect(() => {
        handleScroll();
        return () => {
            setIsAtTop({});
        };
    }, []);

    return (
        <>
            <nav
                id="Navbar"
                className={`flexCenter h-16 px-5% sm:px-7.5% xl:px-1/10 mx-auto sticky top-0 fadeIn
                    ${
                        isAtTop &&
                        "fadeIn bg-btn text-bg z-20 border-b-2 shadow-xl"
                    } 
                    ${route === "/" && `sm:hidden`}`}
            >
                <Link href="/">
                    <a className="flexCenter space-x-2 text-xl">
                        <Image
                            width="24"
                            height="24"
                            src="/images/books.webp"
                            alt="logo"
                        />
                        <span>Your OU Notes</span>
                    </a>
                </Link>
            </nav>
        </>
    );
};

export default Navbar;
