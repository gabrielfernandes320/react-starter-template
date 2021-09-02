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

const PersonalData: React.FC = () => {
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
                <Grid
                    templateColumns={[
                        "repeat(1, 1fr)",
                        "repeat(1, 1fr)",
                        "repeat(2, 1fr)",
                    ]}
                    gap={6}
                >
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
                            placeholder="your@email.com"
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
                            placeholder="Your password"
                            {...register(
                                "password",
                                getValues().id &&
                                    !getValues().password &&
                                    !getValues().passwordConfirmation
                                    ? {}
                                    : {
                                          required: "This is required",
                                          minLength: {
                                              value: 6,
                                              message:
                                                  "Password must have at least 6 characters",
                                          },
                                      }
                            )}
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
                            placeholder="Your password again"
                            {...register(
                                "passwordConfirmation",
                                getValues().id &&
                                    !getValues().password &&
                                    !getValues().passwordConfirmation
                                    ? {}
                                    : {
                                          validate: (value) => {
                                              return (
                                                  value === password.current ||
                                                  "The passwords do not match"
                                              );
                                          },
                                      }
                            )}
                        />
                        <FormErrorMessage>
                            {errors.passwordConfirmation &&
                                errors.passwordConfirmation.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.roles}>
                        <FormLabel>Role</FormLabel>
                        <Select
                            placeholder="Select option"
                            id="roles"
                            {...register("roles" as any, {
                                required: "This is required",
                                setValueAs: (value) => [{ id: value }],
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

export default PersonalData;
