import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FocusEvent } from "react";
import {
    borderColor,
    focusBorderColor,
    hoverBorderColor,
} from "../../helpers/colors";
import ErrorMessage from "./ErrorMessage";

interface Props {
    id: string;
    label: string;
    placeholder: string;
    type: string;
    value: string;
    touch: boolean;
    error: boolean;
    errorMessage: string;
    handleChange: (e: ChangeEvent<any>) => void;
    handleBlur: (e: FocusEvent<any>) => void;
    handleReset: () => void;
}

const Field = (props: Props) => {
    const {
        id,
        label,
        placeholder,
        type,
        value,
        touch,
        error,
        errorMessage,
        handleChange,
        handleBlur,
        handleReset,
    } = props;

    return (
        <FormControl id={id} mb={3} isRequired>
            <FormLabel>{label}</FormLabel>
            <Input
                _hover={{ borderColor: hoverBorderColor }}
                borderColor={borderColor}
                focusBorderColor={focusBorderColor}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onReset={handleReset}
            />
            <ErrorMessage
                error={error}
                touch={touch}
                errMessage={errorMessage}
            />
        </FormControl>
    );
};

export default Field;
