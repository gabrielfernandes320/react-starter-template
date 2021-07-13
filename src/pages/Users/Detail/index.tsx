import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  useToast,
  Switch,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import React, { useRef } from "react";
import NavBar from "../../../components/navigation/NavBar";
import UserHttpService from "../../../services/http/user-http";
import { AxiosResponse } from "axios";
import { IUser } from "../../../interfaces/user/user";
import TopInfoBar from "../../../components/navigation/TopInfoBar";
import PersonalData from "../components/PersonalData";

import {
  useForm,
  SubmitHandler,
  useFormState,
  FormProvider,
  useFormContext,
} from "react-hook-form";
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
  const methods = useForm<IUser>();
  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    mutation.mutate(data);
  };

  return (
    <NavBar>
      <TopInfoBar
        title={"Users"}
        subtitle={"All your users in one place."}
        Buttons={[
          <Button
            onClick={methods.handleSubmit(onSubmit)}
            type={"submit"}
            leftIcon={<CheckIcon />}
            alignContent={"flex-end"}
          >
            Save
          </Button>,
        ]}
      />

      <Box pr={"9"} pl={"9"}>
        <Tabs>
          <TabList>
            <Tab>Personal data</Tab>
            <Tab>Address</Tab>
          </TabList>
          <FormProvider {...methods}>
            <TabPanels>
              <TabPanel>
                <PersonalData />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </FormProvider>
        </Tabs>
      </Box>
    </NavBar>
  );
};
