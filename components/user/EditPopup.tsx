import { ChangeEvent, Fragment } from "react";
import { MdModeEdit } from "react-icons/md";
import {
    Button,
    Icon,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
} from "@chakra-ui/react";
import { btnBorder } from "../../helpers/colors";
import { Note } from "../../pages/admin/[user]";
import { useState } from "react";
import * as yup from "yup";
import ErrorMessage from "../forms/ErrorMessage";
import { useRef } from "react";
import { updateNameAndUrl } from "../../helpers/user";

interface Props {
    note: Note;
    currentUserEmail: string;
}

const urlValidation = yup.string().url("Must be URL");

const EditPopup = ({ note, currentUserEmail }: Props) => {
    const nameRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState<string>(note.name);
    const [url, setUrl] = useState<string>(note.url);
    const [nameErr, setNameErr] = useState<string>();
    const [urlErr, setUrlErr] = useState<string>();
    const [exceptionErr, setExceptionErr] = useState<string>();

    const closeHandler = (onClose: () => void) => {
        onClose();
        setName(note.name);
        setUrl(note.url);
    };

    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setName(e.target.value);
        if (!name || !name.trim()) {
            setNameErr("Required");
            return;
        }
        setNameErr("");
        setExceptionErr("");
    };

    const updateUrl = async (e: ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setUrl(url);
        if (!url || !url.trim()) {
            setUrlErr("Required");
            return;
        }
        const isUrlValid = await urlValidation.isValid(url);
        if (!isUrlValid) {
            setUrlErr("Must be URL");
            return;
        }
        setUrlErr("");
        setExceptionErr("");
    };

    const saveHandler = async (onClose: () => void) => {
        // If name and url are same as prev then close it
        if (note.name === name.trim() && note.url === url.trim()) {
            closeHandler(onClose);
            return;
        }
        try {
            await updateNameAndUrl(note, currentUserEmail, { name, url });
            onClose();
        } catch (err) {
            setExceptionErr(err.message);
        }
    };

    return (
        <Popover initialFocusRef={nameRef}>
            {({ onClose }) => (
                <Fragment>
                    <PopoverTrigger>
                        <Button
                            mt={3}
                            variant="unstyled"
                            className="cursor-pointer"
                        >
                            <Icon as={MdModeEdit} boxSize="7" />
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
                        <PopoverCloseButton
                            onClick={() => closeHandler(onClose)}
                        />
                        <PopoverHeader>Edit Details</PopoverHeader>
                        <PopoverBody className="flex justify-between space-x-4">
                            <ul className="space-y-2">
                                <li>
                                    Name:{" "}
                                    <Input
                                        value={name}
                                        onChange={updateName}
                                        ref={nameRef}
                                    />
                                    <ErrorMessage
                                        errMessage={nameErr}
                                        error={Boolean(nameErr)}
                                        touch={Boolean(nameErr)}
                                    />
                                </li>
                                <li>
                                    URL:{" "}
                                    <Input value={url} onChange={updateUrl} />
                                    <ErrorMessage
                                        errMessage={urlErr}
                                        error={Boolean(urlErr)}
                                        touch={Boolean(urlErr)}
                                    />
                                    <ErrorMessage
                                        errMessage={exceptionErr}
                                        error={Boolean(exceptionErr)}
                                        touch={Boolean(exceptionErr)}
                                    />
                                </li>
                            </ul>
                        </PopoverBody>
                        <PopoverFooter>
                            <div className="w-full flex justify-between">
                                <Button
                                    isDisabled={
                                        Boolean(nameErr) || Boolean(urlErr)
                                    }
                                    onClick={() => saveHandler(onClose)}
                                >
                                    Save
                                </Button>
                                <Button onClick={() => closeHandler(onClose)}>
                                    Cancel
                                </Button>
                            </div>
                        </PopoverFooter>
                    </PopoverContent>
                </Fragment>
            )}
        </Popover>
    );
};

export default EditPopup;
