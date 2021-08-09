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
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { IRole } from "../../../../interfaces/role/role";
import { IUser } from "../../../../interfaces/user/user";

const PersonalData: React.FC = () => {
    const { data: roles } = useQuery(["users"], async () => {
        const { data }: AxiosResponse = await RoleHttpService.index();
        return data.value;
    });

    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<IUser>();

    const password = useRef({});
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

                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@admin"
                            {...register("email", {
                                required: "This is required",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="admin"
                            {...register("password", {
                                required: "This is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must have at least 8 characters",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.passwordConfirmation}>
                        <FormLabel>Confirm your password</FormLabel>
                        <Input
                            id="passwordConfirmation"
                            type="password"
                            placeholder="admin"
                            {...register("passwordConfirmation", {
                                validate: (value) => {
                                    return (
                                        value === password.current ||
                                        "The passwords do not match"
                                    );
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.passwordConfirmation &&
                                errors.passwordConfirmation.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.roles}>
                        <FormLabel>Role</FormLabel>
                        <Select
                            id="roles"
                            type="roles"
                            {...register("roles" as any, {
                                required: "This is required",
                                setValueAs: (id: number) => [{ id }],
                            })}
                        >
                            {roles?.map((role: IRole) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </Select>

                        <FormErrorMessage>
                            {/* {errors.roles && errors.roles.messages} */}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.enabled}>
                        <FormLabel>Enabled</FormLabel>
                        <Switch
                            size={"lg"}
                            id="enabled"
                            {...register("enabled" as any)}
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

export default PersonalData;
