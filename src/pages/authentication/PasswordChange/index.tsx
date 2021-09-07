import React, { useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPasswordChange } from "../../../interfaces/auth/password-change";
import { useMutation } from "react-query";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
} from "@chakra-ui/react";
import { homeRoutePath, loginRoutePath } from "../../../routes/config";
import AuthBaseLayout from "../components/BaseLayout";

const PasswordChange: React.FC = () => {
    const { token } = useParams<{ token: string }>();

    const history = useHistory();
    const mutation = useMutation(async (data: IPasswordChange) => {}, {
        onError: (error: any) => {},
        onSuccess: () => {
            history.push(homeRoutePath);
        },
    });

    const {
        register,
        handleSubmit,
        watch,

        formState: { errors },
    } = useForm<IPasswordChange>({ defaultValues: { token } });
    const onSubmit: SubmitHandler<IPasswordChange> = (
        data: IPasswordChange
    ) => {
        mutation.mutate(data);
    };

    const password = useRef("" as any);
    password.current = watch("password", "");

    return (
        <>
            <AuthBaseLayout title={"Password Change"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Your password"
                            {...register("password", {
                                required: "This is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must have at least 6 characters",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.passwordConfirmation}>
                        <FormLabel>Confirm your password</FormLabel>
                        <Input
                            id="passwordConfirmation"
                            type="password"
                            placeholder="Your password again"
                            {...register("passwordConfirmation", {
                                validate: (value) => {
                                    return (
                                        value === password.current ||
                                        "The passwords do not match"
                                    );
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.passwordConfirmation &&
                                errors.passwordConfirmation.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button
                        isLoading={mutation.isLoading}
                        type="submit"
                        variant="solid"
                        width="full"
                        mt={"10"}
                    >
                        Change Password
                    </Button>
                    <Button
                        isLoading={mutation.isLoading}
                        type="submit"
                        as={Link}
                        to={loginRoutePath}
                        variant="outline"
                        width="full"
                        mt={"2"}
                    >
                        Cancel
                    </Button>
                </form>
            </AuthBaseLayout>
        </>
    );
};

export default PasswordChange;
