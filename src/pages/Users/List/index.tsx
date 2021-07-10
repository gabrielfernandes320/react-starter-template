import {
  ArrowBackIcon,
  AddIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  IconButton,
  Flex,
  Grid,
  SimpleGrid,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import React from "react";
import { useHistory } from "react-router-dom";
import { useTable, useSortBy, Column } from "react-table";
import NavBar from "../../../components/Navigation/NavBar";
import UserHttpService from "../../../services/http/user-http";
import { AxiosResponse } from "axios";

export const List: React.FC = () => {
  const { isLoading, refetch } = useQuery(["users"], async () => {
    const { data }: AxiosResponse = await UserHttpService.index();
    return data;
  });
  const history = useHistory();

  const data = React.useMemo(
    () => [
      {
        fromUnit: "inches",
        toUnit: "millimetres (mm)",
        factor: 25.4,
      },
      {
        fromUnit: "feet",
        toUnit: "centimetres (cm)",
        factor: 30.48,
      },
      {
        fromUnit: "id",
        toUnit: "metres (m)",
        factor: 0.91444,
      },
    ],
    []
  );

  const columns: Column<any>[] = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>({ columns, data }, useSortBy);
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
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </NavBar>
  );
};
