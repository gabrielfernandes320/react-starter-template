import { CheckIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    useToast,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Spinner,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import React from "react";
import NavBar from "../../../components/navigation/NavBar";
import UserHttpService from "../../../services/http/user-http";
import { IUser } from "../../../interfaces/user/user";
import TopInfoBar from "../../../components/navigation/TopInfoBar";
import PersonalData from "../components/PersonalData";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { usersRoutePath } from "../../../routes/config";
export const Detail: React.FC = () => {
    const toast = useToast();
    const methods = useForm<IUser>({
        defaultValues: { enabled: true },
    });
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    useQuery("user", LoadUser, {
        enabled: !!id,
    });

    async function LoadUser() {
        const { data: user }: AxiosResponse<IUser> = await UserHttpService.show(
            id
        );

        methods.reset(user);

        return user;
    }

    const mutation = useMutation(
        async (data: IUser) => {
            await UserHttpService.store(data);
        },
        {
            onError: (error: any) => {
                error.message?.map((message: string) =>
                    toast({
                        title: message,
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                    })
                );
            },
            onSuccess: () => {
                toast({
                    title: "Sucess at saving the user.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                history.push(usersRoutePath);
            },
        }
    );

    const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
        mutation.mutate(data);
    };

    return (
        <NavBar>
            <TopInfoBar
                title={"Users"}
                subtitle={"All your users in one place."}
                Buttons={[
                    <Button
                        onClick={methods.handleSubmit(onSubmit)}
                        type={"submit"}
                        leftIcon={
                            mutation.isLoading ? <Spinner /> : <CheckIcon />
                        }
                        alignContent={"flex-end"}
                    >
                        Save
                    </Button>,
                ]}
            />

            <Box pr={"9"} pl={"9"}>
                <Tabs>
                    <TabList>
                        <Tab>Personal data</Tab>
                    </TabList>
                    <FormProvider {...methods}>
                        <TabPanels>
                            <TabPanel>
                                <PersonalData />
                            </TabPanel>
                        </TabPanels>
                    </FormProvider>
                </Tabs>
            </Box>
        </NavBar>
    );
};
