import React from "react";
import { useColorMode, Box, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box textAlign="right" py={4} mr={4}>
            <IconButton
                aria-label={"theme button"}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
            />
        </Box>
    );
}
