import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Switch,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Grid,
  Select,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
const PersonalData: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <Box>
      <Box pr={"9"} pl={"9"}>
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
                  message: "Password must have at least 8 characters",
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
              type="passwordConfirmation"
              placeholder="admin"
              {...register("passwordConfirmation", {
                validate: (value) => {
                  console.log(value);

                  return (
                    value === password.current || "The passwords do not match"
                  );
                },
              })}
            />
            <FormErrorMessage>
              {errors.passwordConfirmation &&
                errors.passwordConfirmation.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.enabled}>
            <FormLabel>Enabled</FormLabel>
            <Switch
              id="enabled"
              type="enabled"
              {...register("enabled", {
                required: "This is required",
              })}
              size={"lg"}
            />

            <FormErrorMessage>
              {errors.enabled && errors.enabled.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.roles}>
            <FormLabel>Role</FormLabel>
            <Select
              id="roles"
              type="roles"
              {...register("roles", {
                required: "This is required",
              })}
              size={"lg"}
            >
              <option
                value="{
      'id': 2,
      'reference': 'COMMERCIAL',
      'name': 'Comercial',
      'enabled': true
    }"
              >
                Comercial
              </option>
            </Select>

            <FormErrorMessage>
              {errors.roles && errors.roles.message}
            </FormErrorMessage>
          </FormControl>
        </Grid>
      </Box>
    </Box>
  );
};

export default PersonalData;
