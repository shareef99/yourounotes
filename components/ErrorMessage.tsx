import { Text } from "@chakra-ui/react";
import { Field, getIn } from "formik";

export const ErrorMessage = ({ name }) => (
    <Field name={name}>
        {({ form }) => {
            const error = getIn(form.errors, name);
            const touch = getIn(form.touched, name);
            return touch && error ? (
                <Text className="font-medium text-error">{error}</Text>
            ) : null;
        }}
    </Field>
);
