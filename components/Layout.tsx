import React, { FC } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
    children: FC;
}

export const Layout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    );
};
