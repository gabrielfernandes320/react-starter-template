import React from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRecoverAccount } from "../../../interfaces/auth/account-recovery";
import { useMutation } from "react-query";
import Alert from "../../../components/feedback/Alert";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
} from "@chakra-ui/react";
import { homeRoutePath } from "../../../routes/config";
import AuthHttpService from "../../../services/http/auth-http";
import AuthBaseLayout from "../components/BaseLayout";

const AccountRecovery: React.FC = () => {
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
        <AuthBaseLayout title={"Account Recovery"}>
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
                    onClick={history.goBack}
                    width="full"
                    mt={"2"}
                >
                    Cancel
                </Button>
            </form>
        </AuthBaseLayout>
    );
};

export default AccountRecovery;
