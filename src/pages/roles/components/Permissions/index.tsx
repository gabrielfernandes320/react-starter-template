import React from "react";
import PermissionHttpService from "../../../../services/http/permission-http";
import {
    Box,
    FormControl,
    FormErrorMessage,
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
        control,
        getValues,
        reset,

        formState: { errors },
    } = useFormContext<IRole>();

    return (
        <Box mt={"10"}>
            <Box>
                <SimpleGrid columns={3} spacing={10}>
                    {permissions?.map((item: IPermission) => (
                        <>
                            <HStack>
                                <Text w={"25%"} fontSize={"lg"}>
                                    {item.name}
                                </Text>
                                <FormControl isInvalid={!!errors.name}>
                                    <Controller
                                        control={control}
                                        name="permissions"
                                        render={({ field }) => (
                                            <Switch
                                                size={"lg"}
                                                onChange={(e) => {
                                                    let newPermissions: IPermission[] =
                                                        [];
                                                    if (e.target.checked) {
                                                        if (field.value) {
                                                            field.value?.push(
                                                                item
                                                            );
                                                            newPermissions =
                                                                field.value;
                                                        } else {
                                                            newPermissions.push(
                                                                item
                                                            );
                                                        }
                                                    } else {
                                                        newPermissions =
                                                            getValues().permissions?.filter(
                                                                (permission) =>
                                                                    permission.id !==
                                                                    item.id
                                                            );
                                                    }

                                                    const role = getValues();
                                                    role.permissions =
                                                        newPermissions;

                                                    reset(role);
                                                }}
                                                isChecked={
                                                    !!field.value?.find(
                                                        (x) => x.id === item.id
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
