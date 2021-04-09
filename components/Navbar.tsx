import { FC, useEffect, useState } from "react";
import Link from "next/link";
// import { useHistory, Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import IconButton from "@material-ui/core/IconButton";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";

interface Props {}

const Navbar = (props: Props) => {
    const [isAtTop, setIsAtTop] = useState<any>();
    // const history = useHistory();
    // const { currentUser, user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);

    const handleScroll = () => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 50) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }
        });
    };

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        // history.push("/pages/profile");
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotes = () => {
        // history.push(`/student/year=${user.year}/sem=${user.sem}`);
    };

    const handleUpload = () => {
        // history.push("/pages/upload");
    };

    const handleRequest = () => {
        // history.push("/pages/request");
    };

    const handleAbout = () => {
        // history.push("/pages/about-us");
    };

    const handleHome = () => {
        // history.push("/");
    };

    const handleAllSubjects = () => {
        // history.push("/student/all-subjects");
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
                className={`flex justify-between h-16 items-center px-5% sm:px-7.5% xl:px-1/10 mx-auto
                    bg-transparent transition duration-500 ease-in sticky top-0  border-opacity-0 ${
                        isAtTop &&
                        `transition duration-500 ease-in bg-blue-500 text-whiteShade z-20
                      border-b-2 shadow-xl `
                    }`}
            >
                <div>
                    <p
                        onClick={handleHome}
                        className="hover:cursor-pointer font-medium text-midBlack"
                    >
                        Your Notes
                    </p>
                </div>
                {/* {currentUser ? ( */}
                <>
                    <div>
                        <Link href="/signup">
                            <a>signup</a>
                        </Link>
                        {/* <IconButton
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            className="focus:outline-none text-midBlack"
                        >
                            <AccountCircle />
                        </IconButton> */}
                        {/* <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleNotes}>
                                    Your Subjects
                                </MenuItem>
                                <MenuItem onClick={handleAllSubjects}>
                                    All Subjects
                                </MenuItem>
                                <MenuItem onClick={handleUpload}>
                                    Upload Notes
                                </MenuItem>
                                <MenuItem onClick={handleRequest}>
                                    Request Notes
                                </MenuItem>
                                <MenuItem onClick={handleAbout}>
                                    About us
                                </MenuItem>
                                <MenuItem onClick={logout}>Sign out</MenuItem>
                            </Menu> */}
                    </div>
                </>
                {/* ) : ( */}
                <>
                    <div>
                        <button>
                            {/* <Link to="/login">Sign in</Link> */}
                        </button>
                    </div>
                </>
                {/* )} */}
            </nav>
        </>
    );
};

export default Navbar;
