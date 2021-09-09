import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";

interface Props {
    children: ReactNode;
}

interface Notification {
    title: string;
    message: string;
    state: "pending" | "success" | "error";
}

interface notificationContextType {
    notification: Notification | null;
    showNotification: (notification: Notification) => void;
    hideNotification: () => void;
}

const notificationContextDefaultValues: notificationContextType = {
    notification: null,
    showNotification: () => {},
    hideNotification: () => {},
};

const NotificationContext = createContext(notificationContextDefaultValues);

export function useNotification() {
    return useContext(NotificationContext);
}

const NotificationProvider = ({ children }: Props) => {
    const [activeNotification, setActiveNotification] =
        useState<Notification | null>();

    useEffect(() => {
        if (activeNotification) {
            const { state } = activeNotification;
            if (state === "error" || state === "success") {
                const timer = setTimeout(() => {
                    hideNotification();
                }, 3000);

                return () => clearTimeout(timer);
            }
        }
    }, [activeNotification]);

    const showNotification = (notification: Notification) => {
        setActiveNotification(notification);
    };

    const hideNotification = () => {
        setActiveNotification(null);
    };

    const value: notificationContextType = {
        notification: activeNotification,
        showNotification,
        hideNotification,
    };
    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
