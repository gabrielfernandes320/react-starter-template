import React from "react";
import PermissionHttpService from "../../../../services/http/permission-http";
import {
    Box,
    FormControl,
    FormErrorMessage,
    Grid,
    HStack,
    SimpleGrid,
    Switch,
    Text,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useFormContext, Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { IPermission } from "../../../../interfaces/permission/permission";
import { IRole } from "../../../../interfaces/role/role";

const BasicInfo: React.FC = () => {
    const { data: permissions } = useQuery(["permissions"], async () => {
        const { data }: AxiosResponse = await PermissionHttpService.index();
        return data.value;
    });

    const {
        register,
        watch,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useFormContext<IRole>();

    // const memoData: IRole[] = React.useMemo(() => data, [data]);

    // const columns: Column[] = React.useMemo(
    //     () => [
    //         {
    //             Header: "Id",
    //             accessor: "id",
    //         },
    //         {
    //             Header: "Name",
    //             accessor: "name",
    //         },
    //         {
    //             Header: "Created At",
    //             accessor: ({ createdAt }: any) =>
    //                 DateTime.fromISO(createdAt).toLocaleString(),
    //         },
    //         {
    //             Header: "Enabled",
    //             accessor: "enabled",
    //             Cell: (props: any) => (
    //                 <Switch
    //                     size={"lg"}
    //                     onChange={async () => {
    //                         const data: IRole = props.row.original;

    //                         data.enabled = !data.enabled;
    //                         await updateMutation.mutateAsync(data);
    //                         await refetch();
    //                     }}
    //                     isChecked={props.row.original.enabled}
    //                 />
    //             ),
    //         },

    //         {
    //             Header: "Actions",
    //             accessor: "action",
    //             Cell: (props: any) => (
    //                 <Menu>
    //                     <MenuButton
    //                         as={IconButton}
    //                         variant={"ghost"}
    //                         icon={<HamburgerIcon />}
    //                     />
    //                     <MenuList>
    //                         <MenuItem
    //                             as={Link}
    //                             to={`${rolesRoutePath}/${props.row.original.id}/edit`}
    //                         >
    //                             Edit
    //                         </MenuItem>
    //                         <MenuItem
    //                             onClick={async () => {
    //                                 await destroyMutation.mutateAsync(
    //                                     +props.row.original.id
    //                                 );
    //                                 refetch();
    //                             }}
    //                         >
    //                             Delete
    //                         </MenuItem>
    //                     </MenuList>
    //                 </Menu>
    //             ),
    //         },
    //     ],
    //     [destroyMutation, refetch, updateMutation]
    // );

    return (
        <Box mt={"10"}>
            <Box>
                <SimpleGrid columns={3} spacing={10}>
                    {permissions?.map((permission: IPermission) => (
                        <>
                            <HStack>
                                <Text w={"25%"} fontSize={"lg"}>
                                    {permission.name}
                                </Text>
                                <FormControl isInvalid={!!errors.name}>
                                    <Controller
                                        control={control}
                                        name="name"
                                        render={({ field }) => (
                                            <Switch
                                                size={"lg"}
                                                onChange={(e) => {
                                                    const permissions =
                                                        getValues().permissions;

                                                    console.log(permissions);

                                                    const permission: any =
                                                        permissions?.find(
                                                            (x) =>
                                                                x.id ===
                                                                permission.id
                                                        );

                                                    const index =
                                                        permissions.indexOf(
                                                            permission
                                                        );
                                                    if (index > -1) {
                                                        permissions.splice(
                                                            index,
                                                            1
                                                        );
                                                    }

                                                    setValue(
                                                        "permissions",
                                                        permissions
                                                    );
                                                }}
                                                isChecked={
                                                    !!getValues().permissions.find(
                                                        (x) =>
                                                            x.id ===
                                                            permission.id
                                                    )
                                                }
                                            />
                                        )}
                                    />

                                    <FormErrorMessage>
                                        {errors.name && errors.name.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>
                        </>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default BasicInfo;
