import { ArrowBackIcon, AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  IconButton,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  Switch,
  HStack,
  Tag,
  Alert,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
  Select,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import React from "react";
import { useHistory } from "react-router-dom";
import { Column } from "react-table";
import NavBar from "../../../components/navigation/NavBar";
import UserHttpService from "../../../services/http/user-http";
import { AxiosResponse } from "axios";
import { IUser } from "../../../interfaces/user/user";
import { IRole } from "../../../interfaces/role/role";
import TopInfoBar from "../../../components/navigation/TopInfoBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { usersNewRoutePath } from "../../../routes/config";

export const Detail: React.FC = () => {
  const toast = useToast();
  const mutation = useMutation(
    async (data: IUser) => {
      await UserHttpService.store(data);
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
  const { data, isLoading, refetch } = useQuery(["users"], async () => {
    const { data }: AxiosResponse = await UserHttpService.index();
    return data;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    mutation.mutate(data);
  };

  return (
    <NavBar>
      <TopInfoBar
        title={"Users"}
        subtitle={"All your users in one place."}
        Buttons={[
          <Button leftIcon={<AddIcon />} alignContent={"flex-end"}>
            New User
          </Button>,
        ]}
      />

      <Box pr={"9"} pl={"9"}>
        <Tabs>
          <TabList>
            <Tab>Personal data</Tab>
            <Tab>Address</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      })}
                    />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Confirm your password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="admin"
                      {...register("password", {
                        required: "This is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
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
                </Grid>
              </form>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </NavBar>
  );
};
