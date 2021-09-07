import { Box, chakra, SimpleGrid } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import { rolesRoutePath, usersRoutePath } from "../../routes/config";
import Card from "./components/Card";
import PermissionsGate from "../../components/permissions/PermissionsGate";
import { RolePermissions, UserPermissions } from "../../enums/permissions";

export default function Home() {
    return (
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
                textAlign={"center"}
                fontSize={"4xl"}
                py={10}
                fontWeight={"bold"}
            >
                Quick Access
            </chakra.h1>
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 3, lg: 8 }}
            >
                <PermissionsGate
                    allowedPermissions={[
                        UserPermissions.List,
                        UserPermissions.Create,
                    ]}
                >
                    <Card
                        link={usersRoutePath}
                        title={"Users"}
                        subtitle={"All your users in one place."}
                        icon={<BsPerson size={"3em"} />}
                    />
                </PermissionsGate>
                <PermissionsGate
                    allowedPermissions={[
                        RolePermissions.List,
                        RolePermissions.Create,
                    ]}
                >
                    <Card
                        link={rolesRoutePath}
                        title={"Roles"}
                        subtitle={"All your roles in one place."}
                        icon={<AiOutlineLock size={"3em"} />}
                    />
                </PermissionsGate>
            </SimpleGrid>
        </Box>
    );
}
