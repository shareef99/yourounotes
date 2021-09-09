import {
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Button,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useNotification } from "../../context/NotificationContext";
import { btnBorder } from "../../helpers/colors";
import { deleteNote } from "../../helpers/user";
import { Note } from "../../pages/admin/[user]";

interface Props {
    note: Note;
    currentUserEmail: string;
}

const DeletePopup = ({ note, currentUserEmail }: Props) => {
    const { showNotification } = useNotification();

    const deleteNoteHandler = async (note: Note, closeHandler: () => void) => {
        closeHandler();
        showNotification({
            title: "Deleting 🪓🔨",
            message: "Refresh to see changes",
            state: "pending",
        });
        try {
            await deleteNote(note, currentUserEmail);
        } catch (err) {
            showNotification({
                title: "Error ♻",
                message: err.message || "Unable to delete.",
                state: "error",
            });
        }
        showNotification({
            title: "Deleted 🎉",
            message: "Refresh to see changes",
            state: "success",
        });
    };

    return (
        <Popover>
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        <Button
                            mt={3}
                            variant="unstyled"
                            className="float-right cursor-pointer"
                        >
                            <Icon as={MdDelete} boxSize="7" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        borderColor={btnBorder}
                        borderWidth="2px"
                        _focus={{
                            borderColor: btnBorder,
                            borderWidth: "2px",
                        }}
                        width="fit-content"
                    >
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody className="flex justify-between space-x-4">
                            <Button
                                onClick={() => deleteNoteHandler(note, onClose)}
                            >
                                Delete
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};

export default DeletePopup;
