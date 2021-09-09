import { useNotification } from "../context/NotificationContext";
import classes from "../styles/components/notification.module.css";

interface Props {
    title: string;
    message: string;
    status: string;
}

const Notification = ({ title, message, status }: Props) => {
    const { hideNotification } = useNotification();

    let statusClasses = "";

    if (status === "success") {
        statusClasses = classes.success;
    }

    if (status === "error") {
        statusClasses = classes.error;
    }

    if (status === "pending") {
        statusClasses = classes.pending;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div className={activeClasses} onClick={hideNotification}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
};

export default Notification;
