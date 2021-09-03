import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import ThemeToggler from "../../../../components/Theme/ThemeToggler";

interface Props {
    children: ReactNode;
    title: string;
}

const AuthBaseLayout: React.FC<Props> = ({ children, title }) => {
    return (
        <>
            <ThemeToggler />
            <Flex align="center" justifyContent="center">
                <Box p={[0, 0, 40, 40]}>
                    <Box
                        textAlign="left"
                        p={8}
                        borderWidth={[0, 1]}
                        borderRadius={[0, 8]}
                        boxShadow={[0, "xl"]}
                    >
                        <Box mb={"10"} textAlign="center">
                            <Heading>{title}</Heading>
                        </Box>
                        {children}
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default AuthBaseLayout;
