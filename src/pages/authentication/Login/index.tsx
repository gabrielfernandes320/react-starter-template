import React from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../../../interfaces/auth/login";
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
    Image,
    Text,
} from "@chakra-ui/react";
import { homeRoutePath } from "../../../routes/config";
import innova from "../../../assets/images/Innova_site.png";
import ThemeToggler from "../../../components/Theme/ThemeToggler";

const Login: React.FC = () => {
    const auth = useAuth();
    const history = useHistory();
    const mutation = useMutation(
        async (data: ILogin) => {
            await auth.login(data);
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
    } = useForm<ILogin>();
    const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
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
                            <Heading>Login</Heading>
                        </Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl mt={6} isInvalid={!!errors.login}>
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
                                    {...register("login", {
                                        required: "This is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.login && errors.login.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="admin"
                                    {...register("password", {
                                        required: "This is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Text>
                                Forgot your password?{" "}
                                <Button
                                    variant={"link"}
                                    fontWeight={"bold"}
                                    as={"a"}
                                    href={"/home"}
                                >
                                    Account recovery
                                </Button>
                            </Text>
                            <Button
                                isLoading={mutation.isLoading}
                                type="submit"
                                variant="solid"
                                width="full"
                                mt={"10"}
                            >
                                Sign In
                            </Button>
                            <Button
                                isLoading={mutation.isLoading}
                                type="submit"
                                variant="outline"
                                width="full"
                                mt={"2"}
                            >
                                Sign Up
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default Login;
