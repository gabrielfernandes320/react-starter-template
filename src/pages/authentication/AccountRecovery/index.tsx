import React from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRecoverAccount } from "../../../interfaces/auth/recoverAccount";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "react-query";
import Alert from "../../../components/feedback/Alert";
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
} from "@chakra-ui/react";
import { homeRoutePath } from "../../../routes/config";
import ThemeToggler from "../../../components/Theme/ThemeToggler";
import { Link } from "react-router-dom";
import AuthHttpService from "../../../services/http/auth-http";

const AccountRecovery: React.FC = () => {
    const auth = useAuth();
    const history = useHistory();
    const mutation = useMutation(
        async (data: IRecoverAccount) => {
            await AuthHttpService.accountRecovery(data.email);
        },
        {
            onError: (error: any) => {},
            onSuccess: () => {
                history.push(homeRoutePath);
            },
        }
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRecoverAccount>();
    const onSubmit: SubmitHandler<IRecoverAccount> = (
        data: IRecoverAccount
    ) => {
        mutation.mutate(data);
    };

    return (
        <>
            <ThemeToggler />
            <Flex align="center" justifyContent="center">
                <Box p={[0, 0, 40, 40]}>
                    <Box
                        textAlign="left"
                        p={8}
                        borderWidth={[0, 1]}
                        borderRadius={[0, 8]}
                        boxShadow={[0, "xl"]}
                    >
                        <Box textAlign="center">
                            <Heading>Recover Your Account</Heading>
                        </Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl mt={6} isInvalid={!!errors.email}>
                                {mutation.isError && (
                                    <Alert
                                        status={"error"}
                                        message={mutation?.error?.message}
                                    />
                                )}
                                {mutation.isSuccess && (
                                    <Alert
                                        status={"success"}
                                        message={"Login realizado com sucesso!"}
                                    />
                                )}
                                <FormLabel>Email</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    {...register("email", {
                                        required: "This is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Button
                                isLoading={mutation.isLoading}
                                type="submit"
                                variant="solid"
                                width="full"
                                mt={"10"}
                            >
                                Send Link
                            </Button>
                            <Button
                                isLoading={mutation.isLoading}
                                type="submit"
                                variant="outline"
                                width="full"
                                mt={"2"}
                            >
                                Cancel
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default AccountRecovery;
