import RoleHttpService from "../../../../services/http/role-http";
import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Grid,
    Select,
    Switch,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { IRole } from "../../../../interfaces/role/role";
import { IUser } from "../../../../interfaces/user/user";

const BasicInfo: React.FC = () => {
    const { data: roles } = useQuery(["users"], async () => {
        const { data }: AxiosResponse = await RoleHttpService.index();
        return data.value;
    });

    const {
        register,
        watch,
        control,
        getValues,
        formState: { errors },
    } = useFormContext<IUser>();

    const password = useRef("" as any);
    password.current = watch("password", "");

    return (
        <Box>
            <Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isInvalid={!!errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            id="name"
                            type="name"
                            placeholder="Jonh Doe"
                            {...register("name", {
                                required: "This is required",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.enabled}>
                        <FormLabel>Enabled</FormLabel>
                        <Controller
                            control={control}
                            name="enabled"
                            render={({ field }) => (
                                <Switch
                                    size={"lg"}
                                    onChange={(e) =>
                                        field.onChange(e.target.checked)
                                    }
                                    isChecked={field.value}
                                />
                            )}
                        />

                        <FormErrorMessage>
                            {errors.enabled && errors.enabled.message}
                        </FormErrorMessage>
                    </FormControl>
                </Grid>
            </Box>
        </Box>
    );
};

export default BasicInfo;
