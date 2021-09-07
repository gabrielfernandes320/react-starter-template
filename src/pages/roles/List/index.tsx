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
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Column } from "react-table";
import RoleHttpService from "../../../services/http/role-http";
import { AxiosResponse } from "axios";
import { IRole } from "../../../interfaces/role/role";
import Table from "../../../components/data-display/Table";

import TopInfoBar from "../../../components/navigation/TopInfoBar";
import { rolesNewRoutePath, rolesRoutePath } from "../../../routes/config";
import { DateTime } from "luxon";
import PermissionsGate from "../../../components/permissions/PermissionsGate";
import { RolePermissions } from "../../../enums/permissions";

export const List: React.FC = () => {
    const toast = useToast();
    const history = useHistory();

    const { data, refetch } = useQuery(["roles"], async () => {
        const { data }: AxiosResponse = await RoleHttpService.index();

        return data.value;
    });

    const destroyMutation = useMutation(
        async (id: number) => {
            await RoleHttpService.destroy(id);
        },
        {
            onError: (error: any) => {
                toast({
                    title: "Error at deleting the role.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            },
            onSuccess: () => {
                toast({
                    title: "Sucess at deleting the role.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            },
        }
    );

    const updateMutation = useMutation(
        async (data: IRole) => {
            await RoleHttpService.update(data);
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
                    title: "Sucess at updating the role.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            },
        }
    );

    const memoData: IRole[] = React.useMemo(() => data, [data]);

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
                Header: "Created At",
                accessor: ({ createdAt }: any) =>
                    DateTime.fromISO(createdAt).toLocaleString(),
            },
            {
                Header: "Enabled",
                accessor: "enabled",
                Cell: (props: any) => (
                    <PermissionsGate
                        allowedPermissions={[RolePermissions.Update]}
                        noAccessProps={{ isDisabled: true }}
                    >
                        <Switch
                            size={"lg"}
                            onChange={async () => {
                                const data: IRole = props.row.original;

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
                        <MenuButton
                            as={IconButton}
                            variant={"ghost"}
                            icon={<HamburgerIcon />}
                        />
                        <MenuList>
                            <MenuItem
                                as={Link}
                                to={`${rolesRoutePath}/${props.row.original.id}/edit`}
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
        <>
            <TopInfoBar
                title={"Roles"}
                subtitle={"All your roles in one place."}
                Buttons={[
                    <PermissionsGate
                        allowedPermissions={[RolePermissions.Create]}
                    >
                        <Button
                            onClick={() => history.push(rolesNewRoutePath)}
                            leftIcon={<AddIcon />}
                            alignContent={"flex-end"}
                        >
                            New Role
                        </Button>
                    </PermissionsGate>,
                ]}
            />
            <Table columns={columns} data={memoData ?? []} />
        </>
    );
};
