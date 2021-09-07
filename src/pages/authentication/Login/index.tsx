import React from "react";
import { Link, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../../../interfaces/auth/login";
import { useAuth } from "../../../hooks/use-auth";

import { useMutation } from "react-query";
import Alert from "../../../components/feedback/Alert";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Text,
} from "@chakra-ui/react";
import {
    accountRecoveryRoutePath,
    homeRoutePath,
} from "../../../routes/config";
import AuthBaseLayout from "../components/BaseLayout";

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
            <AuthBaseLayout title={"Login"}>
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
                    <Text fontSize={["sm", "md"]}>
                        Forgot your password?{" "}
                        <Button
                            variant={"link"}
                            fontWeight={"bold"}
                            as={Link}
                            to={accountRecoveryRoutePath}
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
            </AuthBaseLayout>
        </>
    );
};

export default Login;
