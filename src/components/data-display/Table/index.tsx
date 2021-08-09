import { useTable } from "react-table";
import {
    Box,
    Table as ChTable,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
export default function Table({ columns, data }: any) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
        });

    return (
        <Box p={4} pt={"2"} pl={"6"} pr={"12"}>
            <ChTable {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <Th
                                    {...column.getHeaderProps()}
                                    isNumeric={column.isNumeric}
                                >
                                    {column.render("Header")}
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
            </ChTable>
        </Box>
    );
}
