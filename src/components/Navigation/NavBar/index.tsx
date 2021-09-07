import { ReactNode } from "react";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";
import ThemeToggler from "../../Theme/ThemeToggler";
import { useAuth } from "../../../hooks/use-auth";
import { HiHome } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { ImLock } from "react-icons/im";
import {
    homeRoutePath,
    rolesRoutePath,
    usersRoutePath,
} from "../../../routes/config";
import { FiBell } from "react-icons/fi";
import { RolePermissions, UserPermissions } from "../../../enums/permissions";
import PermissionsGate from "../../permissions/PermissionsGate";

const Links = [
    {
        name: "Home",
        to: homeRoutePath,
        icon: <HiHome />,
        allowedPermissions: [],
    },
    {
        name: "Users",
        to: usersRoutePath,
        icon: <FaUser />,
        allowedPermissions: [UserPermissions.List, UserPermissions.Create],
    },
    {
        name: "Roles",
        to: rolesRoutePath,
        icon: <ImLock />,
        allowedPermissions: [RolePermissions.List, RolePermissions.Create],
    },
];

const NavLink = ({
    children,
    to,
    icon,
}: {
    children: ReactNode;
    to: string;
    icon: any;
}) => {
    return (
        <Link
            as={ReactLink}
            to={to}
            height={"full"}
            px={2}
            py={1}
            bg={useColorModeValue("gray.100", "gray.900")}
            rounded={"md"}
            _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.300", "gray.700"),
            }}
        >
            <>
                <VStack>
                    {icon}
                    <Box>{children}</Box>
                </VStack>
            </>
        </Link>
    );
};

export default function Navbar({ children }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logout } = useAuth();

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={"20"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={"center"}>
                        <Box></Box>
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            {Links.map((link) => (
                                <PermissionsGate
                                    allowedPermissions={link.allowedPermissions}
                                >
                                    <NavLink
                                        to={link.to}
                                        key={link.to}
                                        icon={link.icon}
                                    >
                                        {link.name}
                                    </NavLink>
                                </PermissionsGate>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        <ThemeToggler />
                        <IconButton
                            mr={5}
                            size="lg"
                            variant="ghost"
                            aria-label="notifications"
                            icon={<FiBell />}
                        />
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={"full"}
                                variant={"link"}
                                cursor={"pointer"}
                            >
                                <Avatar
                                    size={"sm"}
                                    // src={
                                    //   "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    // }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => logout()}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {Links.map((link) => (
                                <PermissionsGate
                                    allowedPermissions={link.allowedPermissions}
                                >
                                    <NavLink
                                        to={link.to}
                                        key={link.to}
                                        icon={link.icon}
                                    >
                                        {link.name}
                                    </NavLink>
                                </PermissionsGate>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box height={"xl"}>{children}</Box>
        </>
    );
}
