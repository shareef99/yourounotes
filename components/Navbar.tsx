import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {}

const Navbar = (props: Props) => {
    const [isAtTop, setIsAtTop] = useState<any>();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log(isMenuOpen);
    };

    return (
        <>
            <nav
                id="Navbar"
                className={`flex justify-between h-16 items-center px-5% sm:px-7.5% xl:px-1/10 mx-auto
                    bg-transparent transition duration-500 ease-in sticky top-0 border-opacity-0 ${
                        isAtTop &&
                        `transition duration-500 ease-in bg-btn text-bg z-20
                      border-b-2 shadow-xl `
                    }`}
            >
                <div>
                    <Link href="/">
                        <a className="flex justify-center items-center space-x-2 text-xl">
                            <Image
                                width="24"
                                height="24"
                                src="/images/books.png"
                            />
                            <span>Your OU Notes</span>
                        </a>
                    </Link>
                </div>
                <div className="relative">
                    <div
                        className={`space-y-2 cursor-pointer focus:hidden `}
                        onClick={handleMenu}
                    >
                        <div
                            className={`w-6 h-1 rounded  ${
                                isAtTop ? `bg-bg` : `bg-heading`
                            } ${
                                isMenuOpen
                                    ? `transition-transform transform duration-500 ease-in rotate-45
                                        translate-y-3 -translate-x-4`
                                    : `transition-transform transform duration-500 ease-in rotate-0
                                        translate-y-0 -translate-x-0`
                            }`}
                        ></div>
                        <div
                            className={`w-6 h-1 rounded ${
                                isAtTop ? `bg-bg` : `bg-heading`
                            } ${
                                isMenuOpen
                                    ? `transition-transform transform duration-500 ease-in -rotate-45`
                                    : `transition-transform transform duration-500 ease-in -rotate-0`
                            }`}
                        ></div>
                    </div>
                    <ul
                        className={`z-50 bg-bg text-heading bg-opacity-75 font-medium text-lg
                            absolute top-10 -left-20 sm:-left-10 w-28 ${
                                isMenuOpen
                                    ? `transition-all duration-700 ease-in opacity-100 
                                        `
                                    : `transition-all duration-700 ease-in opacity-0`
                            }`}
                    >
                        <li>Your Notes 1</li>
                        <li>Your Notes 2</li>
                        <li>Your Notes 3</li>
                        <li>Your Notes 4</li>
                        <li>Your Notes 5</li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
