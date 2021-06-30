import React from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../../../interfaces/auth/login";
import LoginService from "../../../services/login";
import { useMutation } from "react-query";
import Alert from "../../../components/Messages/Alert";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/core";

const Login: React.FC = () => {
  const history = useHistory();
  const mutation = useMutation(
    async (data: ILogin) => {
      console.log(data);
      await LoginService.login(data);
    },
    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {},
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
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box
          my={4}
          textAlign="left"
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={6} isInvalid={!!errors.email}>
              <Alert
                status={"info"}
                message={"email: admin@admin / password: admin"}
              />
              {mutation.isError && (
                <Alert status={"error"} message={mutation?.error?.message} />
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
                placeholder="admin@admin"
                {...register("email", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
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
            <Button
              isLoading={mutation.isLoading}
              type="submit"
              variantColor="teal"
              variant="solid"
              width="full"
              mt={4}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
