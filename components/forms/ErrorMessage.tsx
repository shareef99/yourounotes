import { Text } from "@chakra-ui/react";
import React from "react";

interface Props {
    touch: boolean;
    error: boolean;
    errMessage: string;
}

const ErrorMessage = ({ touch, error, errMessage }: Props) => {
    return touch && error ? (
        <Text mb={3} className="font-medium text-error">
            {errMessage}
        </Text>
    ) : null;
};

export default ErrorMessage;
