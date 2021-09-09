import React, { FC } from "react";
import { useNotification } from "../context/NotificationContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Notification from "./Notification";

interface Props {
    children: FC;
}

export const Layout = ({ children }: Props) => {
    const { notification } = useNotification();

    return (
        <>
            <Navbar />
            <main className="h-full">{children}</main>
            <Footer />
            {Boolean(notification) && (
                <Notification
                    title={notification?.title}
                    message={notification?.message}
                    status={notification?.state}
                />
            )}
        </>
    );
};
