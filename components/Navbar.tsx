import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider,
    MenuList,
} from "@chakra-ui/react";
import { RiAccountCircleFill } from "react-icons/ri";
import { heading, popBg } from "../helpers/colors";

interface Props {}

const Navbar = (prop: Props) => {
    const [isAtTop, setIsAtTop] = useState<any>();
    const router = useRouter();
    const { route, push } = router;
    const { currentUser, logout } = useAuth();

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
        <nav
            id="Navbar"
            className={`flexCenter h-16 px-5% sm:px-7.5% xl:px-1/10 mx-auto sticky top-0 fadeIn
                ${currentUser && "justify-between"} items-center ${
                isAtTop && "fadeIn bg-btn text-bg z-20 border-b-2 shadow-xl"
            } ${route === "/" && `hidden`}`}
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
            {currentUser && (
                <Menu isLazy>
                    <MenuButton as="button">
                        <RiAccountCircleFill size="1.5rem" />
                    </MenuButton>
                    <MenuList
                        className="z-50 shadow-md"
                        backgroundColor={popBg}
                        color={heading}
                    >
                        <Link href={`/admin/${currentUser?.email}`}>
                            <a>
                                <MenuItem>Dashboard</MenuItem>
                            </a>
                        </Link>
                        <Link href="/subjects">
                            <a>
                                <MenuItem>Subjects</MenuItem>
                            </a>
                        </Link>
                        <Link href="/upload">
                            <a>
                                <MenuItem>Upload</MenuItem>
                            </a>
                        </Link>
                        <MenuDivider />
                        <MenuItem
                            onClick={() => {
                                logout();
                                push("/");
                            }}
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            )}
        </nav>
    );
};

export default Navbar;
