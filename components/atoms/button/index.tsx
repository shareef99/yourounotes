import { Button } from "@chakra-ui/react";
import {
    submitBtnBgColor,
    submitBtnHoverBgColor,
} from "../../../helpers/colors";

interface Props {
    isDisable?: boolean;
    label: string;
    type?: "button" | "submit" | "reset";
    isFullWidth?: boolean;
}

export const SolidButton = ({
    isDisable,
    label,
    type = "button",
    isFullWidth = true,
}: Props) => {
    return (
        <Button
            isFullWidth={isFullWidth}
            my={3}
            isDisabled={isDisable}
            type={type}
            className="text-btnText"
            backgroundColor={submitBtnBgColor}
            _hover={{
                backgroundColor: submitBtnHoverBgColor,
            }}
        >
            {label}
        </Button>
    );
};
