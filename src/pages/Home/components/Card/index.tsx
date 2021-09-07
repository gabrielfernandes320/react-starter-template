import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

interface Props {
    title: string;
    subtitle: string;
    link: string;
    icon: ReactNode;
}

const Card: React.FC<Props> = ({ icon, link, subtitle, title }) => (
    <Box
        px={{ base: 2, md: 4 }}
        py={"5"}
        as={Link}
        to={link}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.50", "gray.700"),
            boxShadow: "outline",
            shadow: "",
            cursor: "pointer",
        }}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
    >
        <Flex justifyContent={"space-between"}>
            <Box pl={{ base: 2, md: 4 }}>
                <Text fontSize={"xl"} fontWeight={"medium"} isTruncated>
                    {title}
                </Text>
                <Text fontSize={"md"} isTruncated>
                    {subtitle}
                </Text>
            </Box>
            <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
            >
                {icon}
            </Box>
        </Flex>
    </Box>
);

export default Card;
