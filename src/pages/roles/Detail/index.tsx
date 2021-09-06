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
import RoleHttpService from "../../../services/http/role-http";
import { IRole } from "../../../interfaces/role/role";
import TopInfoBar from "../../../components/navigation/TopInfoBar";
import BasicInfo from "../components/BasicInfo";
import Permissions from "../components/Permissions";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { rolesRoutePath } from "../../../routes/config";
export const Detail: React.FC = () => {
    const toast = useToast();
    const methods = useForm<IRole>({
        defaultValues: { enabled: true },
    });
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    useQuery("role", LoadRole, {
        enabled: !!id,
    });

    async function LoadRole() {
        const { data: role }: AxiosResponse<IRole> = await RoleHttpService.show(
            id
        );

        methods.reset(role);

        return role;
    }

    const mutation = useMutation(
        async (data: IRole) => {
            await RoleHttpService.store(data);
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
                    title: "Sucess at saving the role.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                history.push(rolesRoutePath);
            },
        }
    );

    const onSubmit: SubmitHandler<IRole> = (data: IRole) => {
        mutation.mutate(data);
    };

    return (
        <>
            <TopInfoBar
                title={methods.getValues().name}
                subtitle={"All the informations about the role."}
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
                        <Tab>Basic Info</Tab>
                        <Tab>Permissions</Tab>
                    </TabList>
                    <FormProvider {...methods}>
                        <TabPanels>
                            <TabPanel>
                                <BasicInfo />
                            </TabPanel>
                            <TabPanel>
                                <Permissions />
                            </TabPanel>
                        </TabPanels>
                    </FormProvider>
                </Tabs>
            </Box>
        </>
    );
};
