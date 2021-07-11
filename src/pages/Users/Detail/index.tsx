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

export const Detail: React.FC = () => {
  const toast = useToast();

  const { data, isLoading, refetch } = useQuery(["users"], async () => {
    const { data }: AxiosResponse = await UserHttpService.index();
    return data;
  });

  const mutation = useMutation(
    async (id: number) => {
      await UserHttpService.destroy(id);
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

  const updateMutation = useMutation(
    async (data: IUser) => {
      await UserHttpService.update(data);
    },
    {
      onError: (error: any) => {
        toast({
          title: "Error at updating the user.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        toast({
          title: "Sucess at updating the user.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  const history = useHistory();

  const memoData: IUser[] = React.useMemo(() => data, [data]);

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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Criado em",
        accessor: "createdAt",
      },
      {
        Header: "Roles",
        accessor: "roles",
        Cell: (props: any) => (
          <HStack spacing={"2"}>
            {props.row.original.roles.map((role: IRole) => (
              <Tag size={"lg"} key={role.id} variant="solid" colorScheme="blue">
                {role.name}
              </Tag>
            ))}
          </HStack>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (props: any) => (
          <Switch
            size={"lg"}
            onChange={async () => {
              const data: IUser = props.row.original;
              data.enabled = !data.enabled;
              await updateMutation.mutateAsync(data);
              refetch();
            }}
            isChecked={props.row.original.enabled}
          />
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
              <MenuItem>Edit</MenuItem>
              <MenuItem
                onClick={async () => {
                  await mutation.mutateAsync(+props.row.original.id);
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
    [mutation, refetch, updateMutation]
  );

  return (
    <NavBar>
      <Box
        marginBottom={"10"}
        borderBottomWidth={1}
        boxShadow={"md"}
        height={"fit-content"}
        p={4}
        pt={"2"}
        pl={"6"}
        display="flex"
        alignContent={"center"}
        alignItems="center"
      >
        <IconButton
          onClick={() => {
            history.goBack();
          }}
          mr="2"
          aria-label="Back"
          variant={"ghost"}
          icon={<ArrowBackIcon w={7} h={7} />}
        />
        <Box>
          <Text fontSize={"xl"} fontWeight="bold">
            Users
          </Text>
          <Text fontSize={"md"}>All yours users in one place</Text>
        </Box>
        <Spacer />
        <Box pr={6}>
          <Button leftIcon={<AddIcon />} alignContent={"flex-end"}>
            New User
          </Button>
        </Box>
      </Box>
    </NavBar>
  );
};
