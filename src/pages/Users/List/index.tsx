import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useToast,
    Switch,
    Tag,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Column } from "react-table";
import NavBar from "../../../components/navigation/NavBar";
import UserHttpService from "../../../services/http/user-http";
import { AxiosResponse } from "axios";
import { IUser } from "../../../interfaces/user/user";
import Table from "../../../components/data-display/Table";

import TopInfoBar from "../../../components/navigation/TopInfoBar";
import { usersNewRoutePath, usersRoutePath } from "../../../routes/config";
import { DateTime } from "luxon";
import { IRole } from "../../../interfaces/role/role";

export const List: React.FC = () => {
    const toast = useToast();
    const history = useHistory();

    const { data, refetch } = useQuery(["users"], async () => {
        const { data }: AxiosResponse = await UserHttpService.index();

        return data.value;
    });

    const destroyMutation = useMutation(
        async (id: number) => {
            await UserHttpService.destroy(id);
        },
        {
            onError: (error: any) => {
                toast({
                    title: "Error at deleting the user.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            },
            onSuccess: () => {
                toast({
                    title: "Sucess at deleting the user.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            },
        }
    );

    const updateMutation = useMutation(
        async (data: IUser) => {
            await UserHttpService.update(data);
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
                    title: "Sucess at updating the user.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            },
        }
    );

    const memoData: IUser[] = React.useMemo(() => data, [data]);

    const columns: Column[] = React.useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Created At",
                accessor: ({ createdAt }: any) =>
                    DateTime.fromISO(createdAt).toLocaleString(),
            },
            {
                Header: "Role",
                accessor: "role",
                Cell: (props: any) =>
                    props.row.original.roles ? (
                        props.row.original.roles?.map((role: IRole) => (
                            <Tag
                                size={"lg"}
                                key={role.id}
                                variant="solid"
                                colorScheme="blue"
                            >
                                {role.name}
                            </Tag>
                        ))
                    ) : (
                        <> </>
                    ),
            },
            {
                Header: "Enabled",
                accessor: "enabled",
                Cell: (props: any) => (
                    <Switch
                        size={"lg"}
                        onChange={async () => {
                            const data: IUser = props.row.original;

                            data.enabled = !data.enabled;
                            await updateMutation.mutateAsync(data);
                            refetch();
                        }}
                        isChecked={props.row.original.enabled}
                    />
                ),
            },

            {
                Header: "Actions",
                accessor: "action",
                Cell: (props: any) => (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            variant={"ghost"}
                            icon={<HamburgerIcon />}
                        />
                        <MenuList>
                            <MenuItem
                                as={Link}
                                to={`${usersRoutePath}/${props.row.original.id}/edit`}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={async () => {
                                    await destroyMutation.mutateAsync(
                                        +props.row.original.id
                                    );
                                    refetch();
                                }}
                            >
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ),
            },
        ],
        [destroyMutation, refetch, updateMutation]
    );

    return (
        <NavBar>
            <TopInfoBar
                title={"Users"}
                subtitle={"All your users in one place."}
                Buttons={[
                    <Button
                        onClick={() => history.push(usersNewRoutePath)}
                        leftIcon={<AddIcon />}
                        alignContent={"flex-end"}
                    >
                        New User
                    </Button>,
                ]}
            />
            <Table columns={columns} data={memoData ?? []} />
        </NavBar>
    );
};
