import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FocusEvent } from "react";
import {
    borderColor,
    focusBorderColor,
    hoverBorderColor,
} from "../../helpers/colors";

interface Props {
    id: string;
    label: string;
    placeholder: string;
    type: string;
    value: string;
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
        error,
        errorMessage,
        handleChange,
        handleBlur,
        handleReset,
    } = props;

    return (
        <FormControl id={id} mb={3}>
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
            {error && (
                <Text mb={3} className="font-medium text-error">
                    {errorMessage}
                </Text>
            )}
        </FormControl>
    );
};

export default Field;
