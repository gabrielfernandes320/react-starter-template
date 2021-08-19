import React from "react";
import PermissionHttpService from "../../../../services/http/permission-http";
import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Grid,
    Switch,
    Text,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useFormContext, Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { IPermission } from "../../../../interfaces/permission/permission";

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
        formState: { errors },
    } = useFormContext<IPermission>();

    return (
        <Box>
            <Box>
                <Grid mt={"10"} templateColumns="repeat(2, 1fr)" gap={6}>
                    {permissions?.map((permission: IPermission) => (
                        <>
                            <Text fontSize={"xl"}>{permission.name}</Text>
                            <FormControl isInvalid={!!errors.name}>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <Switch
                                            size={"lg"}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                            isChecked={true}
                                        />
                                    )}
                                />

                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>{" "}
                        </>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default BasicInfo;
