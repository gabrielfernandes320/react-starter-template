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
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import React from "react";
import { useHistory } from "react-router-dom";
import { Column } from "react-table";
import NavBar from "../../../components/Navigation/NavBar";
import UserHttpService from "../../../services/http/user-http";
import { AxiosResponse } from "axios";
import { IUser } from "../../../interfaces/user/user";
import Table from "../../../components/data-display/Table";

export const List: React.FC = () => {
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
        Header: "Status",
        accessor: "status",
        Cell: (props: any) => <Switch />,
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
    [mutation, refetch]
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
        <Button leftIcon={<AddIcon />} alignContent={"flex-end"}>
          New User
        </Button>
      </Box>
      <Table columns={columns} data={memoData} />
    </NavBar>
  );
};
