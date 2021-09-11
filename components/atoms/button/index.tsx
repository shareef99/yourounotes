import { Button } from "@chakra-ui/react";
import {
    btnBorder,
    btnText,
    hoverBorderColor,
    submitBtnBgColor,
    submitBtnHoverBgColor,
} from "../../../helpers/colors";

interface SolidButtonProps {
    isDisable?: boolean;
    label: string;
    type?: "button" | "submit" | "reset";
    isFullWidth?: boolean;
}

interface OutlineButtonProps {
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
}: SolidButtonProps) => {
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

export const OutlineButton = ({
    label,
    isDisable,
    isFullWidth,
    type,
}: OutlineButtonProps) => {
    return (
        <Button
            isFullWidth={isFullWidth}
            isDisabled={isDisable}
            type={type}
            variant="outline"
            borderWidth={"2px"}
            borderColor={btnBorder}
            _hover={{
                backgroundColor: hoverBorderColor,
                borderColor: hoverBorderColor,
                transitionProperty: "background-color, border-color, color",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)",
                transitionDuration: "500ms",
                color: btnText,
            }}
        >
            {label}
        </Button>
    );
};
