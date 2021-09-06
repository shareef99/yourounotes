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
import { btnBorder } from "../../helpers/colors";
import {
    deleteNoteFromUploaders,
    deleteNoteFromSubjects,
} from "../../helpers/user";
import { Note } from "../../pages/admin/[user]";

interface Props {
    note: Note;
    currentUserEmail: string;
}

const DeletePopup = ({ note, currentUserEmail }: Props) => {
    const deleteNote = async (note: Note, closeHandler: () => void) => {
        await deleteNoteFromSubjects(note);
        await deleteNoteFromUploaders(note.id, currentUserEmail);
        closeHandler();
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
                            <Button onClick={() => deleteNote(note, onClose)}>
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
