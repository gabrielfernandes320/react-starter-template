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
    Text,
    Center,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Column } from "react-table";
import UserHttpService from "../../../services/http/user-http";
import { AxiosResponse } from "axios";
import { IUser } from "../../../interfaces/user/user";
import Table from "../../../components/data-display/Table";

import TopInfoBar from "../../../components/navigation/TopInfoBar";
import { usersNewRoutePath, usersRoutePath } from "../../../routes/config";
import { DateTime } from "luxon";
import { IRole } from "../../../interfaces/role/role";
import PermissionsGate from "../../../components/permissions/PermissionsGate";
import { UserPermissions } from "../../../enums/permissions";

export const List: React.FC = () => {
    const toast = useToast();
    const history = useHistory();

    const { data: users, refetch } = useQuery(["users"], async () => {
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

    const memoData: IUser[] = React.useMemo(() => users, [users]);

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
                                mr={"2.5"}
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
                    <PermissionsGate
                        allowedPermissions={[UserPermissions.Update]}
                        noAccessProps={{ isDisabled: true }}
                    >
                        <Switch
                            size={"lg"}
                            onChange={async () => {
                                const data: IUser = props.row.original;
                                data.enabled = !data.enabled;
                                await updateMutation.mutateAsync(data);
                                await refetch();
                            }}
                            isChecked={props.row.original.enabled}
                        />
                    </PermissionsGate>
                ),
            },

            {
                Header: "Actions",
                accessor: "action",
                Cell: (props: any) => (
                    <Menu>
                        <PermissionsGate
                            allowedPermissions={[
                                UserPermissions.Delete,
                                UserPermissions.Update,
                            ]}
                            noAccessProps={{ disabled: true }}
                        >
                            <MenuButton
                                as={IconButton}
                                variant={"ghost"}
                                icon={<HamburgerIcon />}
                            />
                        </PermissionsGate>

                        <MenuList>
                            <PermissionsGate
                                allowedPermissions={[UserPermissions.Update]}
                            >
                                <MenuItem
                                    as={Link}
                                    to={`${usersRoutePath}/${props.row.original.id}/edit`}
                                >
                                    Edit
                                </MenuItem>
                            </PermissionsGate>

                            <PermissionsGate
                                allowedPermissions={[UserPermissions.Delete]}
                            >
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
                            </PermissionsGate>
                        </MenuList>
                    </Menu>
                ),
            },
        ],
        [destroyMutation, refetch, updateMutation]
    );

    return (
        <>
            <TopInfoBar
                title={"Users"}
                subtitle={"All your users in one place."}
                Buttons={[
                    <PermissionsGate
                        allowedPermissions={[UserPermissions.Create]}
                    >
                        <Button
                            onClick={() => history.push(usersNewRoutePath)}
                            leftIcon={<AddIcon />}
                            alignContent={"flex-end"}
                        >
                            New User
                        </Button>
                    </PermissionsGate>,
                ]}
            />
            <PermissionsGate
                renderNoAccess={
                    <Center>
                        <Text fontSize={"xl"}>
                            You don`t have access to see this.
                        </Text>
                    </Center>
                }
                allowedPermissions={[UserPermissions.List]}
            >
                <Table columns={columns} data={memoData ?? []} />
            </PermissionsGate>
        </>
    );
};
